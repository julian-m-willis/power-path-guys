from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import date
from datetime import datetime, timedelta
from database import SessionLocal
from models import Users, ExerciseRecord, FoodRecord, Food, WaterConsumption

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/daily-summary/{user_id}", status_code=status.HTTP_200_OK)
def get_daily_summary(user_id: int, query_date: date = date.today(), db: Session = Depends(get_db)):
    # Check if the user exists
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Get total calories burned for the day from exercise records
    total_calories_burned = db.query(func.sum(ExerciseRecord.calories_burned))\
        .filter(
            ExerciseRecord.user_id == user_id,
            func.date(ExerciseRecord.date) == query_date
        ).scalar() or 0.0

    # Get total water consumption for the day
    total_water_consumed = db.query(func.sum(WaterConsumption.amount_ml))\
        .filter(
            WaterConsumption.user_id == user_id,
            func.date(WaterConsumption.date) == query_date
        ).scalar() or 0.0

    # Get total calories, protein, and fat intake for the day from food records
    food_summary = db.query(
        func.sum(Food.calories).label('total_calories'),
        func.sum(Food.protein).label('total_protein'),
        func.sum(Food.fat).label('total_fat')
    ).join(FoodRecord, Food.id == FoodRecord.food_id)\
     .filter(
         FoodRecord.user_id == user_id,
         func.date(FoodRecord.date) == query_date
     ).first()

    # Set default values if no food records are found
    total_calories_intake = food_summary.total_calories or 0.0
    total_protein_intake = food_summary.total_protein or 0.0
    total_fat_intake = food_summary.total_fat or 0.0

    return {
        "user_id": user_id,
        "date": query_date,
        "total_calories_burned": total_calories_burned,
        "total_water_consumed_ml": total_water_consumed,
        "total_calories_intake": total_calories_intake,
        "total_protein_intake_g": total_protein_intake,
        "total_fat_intake_g": total_fat_intake
    }
@router.get("/calories-burnt/{user_id}")
async def get_calories_burnt(user_id: int, db: Session = Depends(get_db)):
    try:
        today = datetime.utcnow()
        start_of_today = today.replace(hour=0, minute=0, second=0, microsecond=0)

        # Fetch data for today
        today_records = db.query(ExerciseRecord).filter(
            ExerciseRecord.user_id == user_id,
            ExerciseRecord.date >= start_of_today
        ).all()
        today_calories = sum(record.calories_burned for record in today_records)

        # Fetch data for the last 7 days (week)
        start_of_week = today - timedelta(days=7)
        week_records = db.query(ExerciseRecord).filter(
            ExerciseRecord.user_id == user_id,
            ExerciseRecord.date >= start_of_week
        ).all()
        week_calories_data = {}
        for record in week_records:
            record_date = record.date.date()
            if record_date not in week_calories_data:
                week_calories_data[record_date] = 0
            week_calories_data[record_date] += record.calories_burned
        week_calories_list = [week_calories_data.get((today - timedelta(days=i)).date(), 0) for i in range(7)][::-1]

        # Fetch data for the last 30 days (month)
        start_of_month = today - timedelta(days=30)
        month_records = db.query(ExerciseRecord).filter(
            ExerciseRecord.user_id == user_id,
            ExerciseRecord.date >= start_of_month
        ).all()
        month_calories_data = {}
        for record in month_records:
            record_date = record.date.date()
            if record_date not in month_calories_data:
                month_calories_data[record_date] = 0
            month_calories_data[record_date] += record.calories_burned
        month_calories_list = [month_calories_data.get((today - timedelta(days=i)).date(), 0) for i in range(30)][::-1]

        return {
            "today": today_calories,
            "week": week_calories_list,
            "month": month_calories_list
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching calories burnt data: {str(e)}")