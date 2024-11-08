from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func
from models import Users, Food, FoodRecord, WaterConsumption
from database import SessionLocal
from typing import Annotated
from datetime import datetime, date, timedelta

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# Pydantic model for food creation
class FoodCreate(BaseModel):
    name: str
    calories: float

# Endpoint to add a new food entry
# @router.post("/create-food")
# def create_food_in_db(food: FoodCreate, db: Session = Depends(get_db)):
#     # Check if food already exists (case-insensitive)
#     existing_food = db.query(Food).filter(func.lower(Food.name) == food.name.lower()).first()
#     if existing_food:
#         raise HTTPException(status_code=400, detail="Food already exists")
    
#     # Add new food to the database
#     new_food = Food(name=food.name, calories=food.calories)
#     db.add(new_food)
#     db.commit()
#     db.refresh(new_food)
    
#     return {"message": "Food added successfully", "food": new_food}

# 1. Add food record for a user
@router.get("/get_foods", response_model=list[dict])
def get_foods(db: Session = Depends(get_db)):
    """
    Endpoint to retrieve all foods from the database.
    """
    foods = db.query(Food).all()
    if not foods:
        raise HTTPException(status_code=404, detail="No foods found")

    # Returning a list of foods as dictionaries
    return [{"id": food.id, "name": food.name, "calories": food.calories,
             "protein": food.protein, "fat": food.fat} for food in foods]
    
@router.post("/add-food-record")
def add_food_record(user_id: int, food_name: str, db: db_dependency):
    # Check if user exists
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Search for the food by name (case-insensitive)
    food = db.query(Food).filter(func.lower(Food.name) == food_name.lower()).first()
    
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    
    # Create a new food record for the user
    food_record = FoodRecord(user_id=user_id, food_id=food.id)
    db.add(food_record)
    db.commit()
    db.refresh(food_record)
    
    return {"message": "Food record added successfully", "food_record": food_record}

# 2. Get total calories eaten by a user on a specific day
@router.get("/user-calories")
def get_user_calories(user_id: int, date: date, db: db_dependency):
    # Check if user exists
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Query for food records by the user on the specific day
    food_records = db.query(FoodRecord).filter(
        FoodRecord.user_id == user_id,
        FoodRecord.date.between(datetime(date.year, date.month, date.day), datetime(date.year, date.month, date.day, 23, 59, 59))
    ).all()
    
    if not food_records:
        return {"user_id": user_id, "date": date, "total_calories": 0}
    
    # Calculate total calories
    total_calories = sum(record.food.calories for record in food_records)
    
    return {"user_id": user_id, "date": date, "total_calories": total_calories}

@router.get("/weekly-nutrition/{user_id}")
async def get_weekly_nutrition(user_id: int, db: Session = Depends(get_db)):
    try:
        today = datetime.utcnow().date()
        start_of_week = today - timedelta(days=today.weekday())  # Get Monday of the current week

        # Initialize the weekly data structure
        week_data = {
            i: {"calories": 0, "carbs": 0, "fat": 0, "protein": 0, "water": 0} for i in range(7)
        }

        # Query food records for the user for this week
        food_records = db.query(FoodRecord).filter(
            FoodRecord.user_id == user_id,
            FoodRecord.date >= start_of_week,
            FoodRecord.date < start_of_week + timedelta(days=7)
        ).all()

        # Calculate nutrition values from food records
        for record in food_records:
            food = db.query(Food).filter(Food.id == record.food_id).first()
            if food:
                record_day = (record.date.date() - start_of_week).days
                week_data[record_day]["calories"] += food.calories
                week_data[record_day]["carbs"] += food.calories * 0.15  # Simplified carbs estimation
                week_data[record_day]["fat"] += food.fat
                week_data[record_day]["protein"] += food.protein

        # Query water consumption for the user for this week
        water_records = db.query(WaterConsumption).filter(
            WaterConsumption.user_id == user_id,
            WaterConsumption.date >= start_of_week,
            WaterConsumption.date < start_of_week + timedelta(days=7)
        ).all()

        # Calculate water consumption
        for record in water_records:
            record_day = (record.date.date() - start_of_week).days
            week_data[record_day]["water"] += record.amount_ml

        return week_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating weekly nutrition data: {str(e)}")
