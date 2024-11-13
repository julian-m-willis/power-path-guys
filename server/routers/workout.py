from fastapi import APIRouter, Depends, HTTPException, status
import os
from typing import Optional
from fastapi.responses import JSONResponse
import json
from models import ExerciseRecord, Users, WorkoutPlan
import http.client
from pydantic import BaseModel
from database import SessionLocal
from typing import Annotated, List
from sqlalchemy.orm import Session
import random
from datetime import datetime
import requests

X_RAPIDAPI_KEY = os.getenv("X_RAPIDAPI_KEY")
X_RAPIDAPI_HOST = os.getenv("X_RAPIDAPI_HOST")

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


# Define available body part themes and JSON files
BODY_PART_LIST = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"]

# Define custom full-body themes
FULLBODY_THEMES = ["Fullbody", "Fullbody (Upper Focus)", "Fullbody (Lower Focus)"]

# Map themes to JSON files for custom full-body themes
THEME_FILE_MAPPING = {
    "Fullbody": ["back", "chest", "upper legs", "shoulders"],
    "Fullbody (Upper Focus)": ["upper arms", "shoulders", "chest", "back"],
    "Fullbody (Lower Focus)": ["lower legs", "upper legs", "waist"]
}

DATA_DIRECTORY = "./data"

class ExerciseRecordCreate(BaseModel):
    user_id: int
    calories_burned: float
    date: datetime = datetime.utcnow()

@router.post("/record-exercise", status_code=status.HTTP_201_CREATED)
def record_exercise(data: ExerciseRecordCreate, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(Users).filter(Users.id == data.user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Create a new exercise record
    exercise_record = ExerciseRecord(
        user_id=data.user_id,
        calories_burned=data.calories_burned,
        date=data.date
    )
    db.add(exercise_record)
    db.commit()
    db.refresh(exercise_record)

    return {"message": "Exercise record added successfully", "record": exercise_record}

@router.get("/suggest-exercises/{theme}", status_code=status.HTTP_200_OK)
async def suggest_exercises(theme: Optional[str] = "random"):
    if theme is None or theme == "random":
        theme = random.choice(FULLBODY_THEMES)

    if theme not in THEME_FILE_MAPPING:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No exercises found for theme '{theme}'"
        )

    all_exercises = []

    headers = {
        'x-rapidapi-key': X_RAPIDAPI_KEY,
        'x-rapidapi-host': X_RAPIDAPI_HOST
    }

    # Call the API for each body part based on the theme
    for body_part in THEME_FILE_MAPPING[theme]:
        api_url = f"https://{X_RAPIDAPI_HOST}/exercises/bodyPart/{body_part}?limit=20&offset=0"
        
        try:
            response = requests.get(api_url, headers=headers)
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"API call failed for body part '{body_part}' with status {response.status_code}"
                )

            # Append the exercises from the response
            body_part_exercises = response.json()
            all_exercises.extend(body_part_exercises)

        except requests.exceptions.RequestException as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred while fetching exercises for body part '{body_part}': {str(e)}"
            )

    # Check if we have exercises to return
    if not all_exercises:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No exercises found for theme '{theme}'"
        )

    # Randomly select 20 exercises or fewer if there aren't 20 available
    selected_exercises = random.sample(all_exercises, min(20, len(all_exercises)))

    return {"theme": theme, "suggested_exercises": selected_exercises}


@router.get("/bodyPartList", status_code=status.HTTP_200_OK)
async def get_body_part_list():
    return {"bodyPartList": ["back","cardio","chest","lower arms","lower legs","neck","shoulders","upper arms","upper legs","waist"]}

@router.get("/bodyPartList/{bodypart}", status_code=status.HTTP_200_OK)
async def get_exercise_by_body_part(bodypart: str):
    # Construct the API URL
    api_url = f"https://{X_RAPIDAPI_HOST}/exercises/bodyPart/{bodypart}?limit=20&offset=0"
    
    headers = {
        'x-rapidapi-key': X_RAPIDAPI_KEY,
        'x-rapidapi-host': X_RAPIDAPI_HOST
    }
    
    try:
        # Make the request to the external API
        response = requests.get(api_url, headers=headers)
        
        # Check if the response is successful
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"API call failed with status {response.status_code}")

        # Parse the response JSON
        exercises = response.json()

        # Return the data as JSON response
        return {"bodypart": bodypart, "data": exercises}

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


class WorkoutPlanCreate(BaseModel):
    user_id: int
    workout_ids: List[str]  # List of workout IDs
    calories: float = 0.0  # Optional field, can be updated later
    status: str = "Not Completed"  # Default value for new plans
    
@router.post("/save", status_code=status.HTTP_201_CREATED)
def save_workout_plan(data: WorkoutPlanCreate, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == data.user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    new_workout_plan = WorkoutPlan(
        user_id=data.user_id,
        workout_ids=data.workout_ids,
        calories=data.calories,
        status=data.status
    )
    db.add(new_workout_plan)
    db.commit()
    db.refresh(new_workout_plan)

    return {"message": "Workout plan saved successfully", "workout_plan": new_workout_plan}

@router.get("/workout_plan/{id}", status_code=status.HTTP_200_OK)
def get_workout_plan_by_id(id: int, db: Session = Depends(get_db)):
    workout_plan = db.query(WorkoutPlan).filter(WorkoutPlan.id == id).first()
    if not workout_plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workout plan not found")

    headers = {
        "x-rapidapi-key": X_RAPIDAPI_KEY,
        "x-rapidapi-host": X_RAPIDAPI_HOST
    }

    detailed_exercises = []

    # Fetch detailed data for each workout ID
    for workout_id in workout_plan.workout_ids:
        api_url = f"https://exercisedb.p.rapidapi.com/exercises/exercise/{workout_id}"
        try:
            response = requests.get(api_url, headers=headers)
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Failed to fetch details for workout ID {workout_id}"
                )
            exercise_detail = response.json()
            detailed_exercises.append(exercise_detail)
        except requests.exceptions.RequestException as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred while fetching details for workout ID {workout_id}: {str(e)}"
            )

    return {
        "message": "Workout plan retrieved successfully",
        "workout_ids": workout_plan.workout_ids,
        "detailed_exercises": detailed_exercises
    }

@router.post("/workout_plan/{id}/complete", status_code=status.HTTP_200_OK)
def complete_workout_plan(id: int, db: Session = Depends(get_db)):
    # Retrieve the workout plan by ID
    workout_plan = db.query(WorkoutPlan).filter(WorkoutPlan.id == id).first()
    if not workout_plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workout plan not found")

    # Update the workout plan status to "Completed"
    workout_plan.status = "Completed"
    db.commit()
    db.refresh(workout_plan)

    # Check if the user exists
    user = db.query(Users).filter(Users.id == workout_plan.user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Create a new exercise record for the user with the associated calories
    new_exercise_record = ExerciseRecord(
        user_id=workout_plan.user_id,
        calories_burned=workout_plan.calories,
        date=datetime.utcnow()
    )
    db.add(new_exercise_record)
    db.commit()
    db.refresh(new_exercise_record)

    return {
        "message": "Workout plan marked as completed and exercise record created successfully",
        "workout_plan": {
            "id": workout_plan.id,
            "status": workout_plan.status,
            "user_id": workout_plan.user_id,
            "calories": workout_plan.calories,
            "created_at": workout_plan.created_at
        },
        "exercise_record": {
            "id": new_exercise_record.id,
            "user_id": new_exercise_record.user_id,
            "calories_burned": new_exercise_record.calories_burned,
            "date": new_exercise_record.date
        }
    }
