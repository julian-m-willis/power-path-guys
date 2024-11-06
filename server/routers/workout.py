from fastapi import APIRouter, Depends, HTTPException, status
import os
from typing import Optional
from fastapi.responses import JSONResponse
import json
import http.client
import random

X_RAPIDAPI_KEY = os.getenv("X_RAPIDAPI_KEY")
X_RAPIDAPI_HOST = os.getenv("X_RAPIDAPI_HOST")

router = APIRouter()

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