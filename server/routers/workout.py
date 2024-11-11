from fastapi import APIRouter, Depends, HTTPException, status
import os
from typing import Optional
from fastapi.responses import JSONResponse
import json
from models import ExerciseRecord, Users
import http.client
from pydantic import BaseModel
from database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
import random
from datetime import datetime

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
    
    # Select appropriate files based on the theme
    if theme in THEME_FILE_MAPPING:
        selected_files = [os.path.join(DATA_DIRECTORY, f"{part}.json") for part in THEME_FILE_MAPPING[theme]]
    else:
        selected_files = [os.path.join(DATA_DIRECTORY, f"{theme}.json")]

    # Collect exercises from selected files
    all_exercises = []
    for file_path in selected_files:
        if os.path.isfile(file_path):
            with open(file_path, "r") as file:
                data = json.load(file).get("data", [])
                all_exercises.extend(data)

    # Check if we have exercises to select from
    if not all_exercises:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No exercises found for theme '{theme}'"
        )

    # Randomly select 20 exercises or fewer if there aren't 20 available
    selected_exercises = random.sample(all_exercises, min(20, len(all_exercises)))

    # Return the selected exercises as JSON response
    return {"theme": theme, "suggested_exercises": selected_exercises}


@router.get("/bodyPartList", status_code=status.HTTP_200_OK)
async def get_body_part_list():
    return {"bodyPartList": ["back","cardio","chest","lower arms","lower legs","neck","shoulders","upper arms","upper legs","waist"]}

@router.get("/bodyPartList/{bodypart}", status_code=status.HTTP_200_OK)
async def get_exercise_by_body_part(bodypart: str):
    directory = "./data"
    file_path = os.path.join(directory, f"{bodypart}.json")
    if not os.path.isfile(file_path):
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": f"Data for body part '{bodypart}' not found"}
        )

    # Read the JSON file
    with open(file_path, "r") as file:
        data = json.load(file)

    # Return the data as JSON response
    return data