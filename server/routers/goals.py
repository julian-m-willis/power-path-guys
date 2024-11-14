from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, and_
from datetime import date
from datetime import datetime, timedelta
from database import SessionLocal
from models import Users, ExerciseRecord, FoodRecord, Food, WaterConsumption, Comment, Post, Like

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
    
@router.post("/posts/{post_id}/like", status_code=status.HTTP_200_OK)
def like_post(post_id: int, user_id: int, db: Session = Depends(get_db)):
    existing_like = db.query(Like).filter(Like.post_id == post_id, Like.user_id == user_id).first()
    if existing_like:
        # Increment the total_likes count in the Post model
        post = db.query(Post).filter(Post.id == post_id).first()
        post.total_likes -= 1
        
        # If the like already exists, remove it (unlike)
        db.delete(existing_like)
        db.commit()
        return {"message": "Post unliked successfully"}
    else:
        # If the like does not exist, add a new like
        new_like = Like(post_id=post_id, user_id=user_id)
        db.add(new_like)

        # Increment the total_likes count in the Post model
        post = db.query(Post).filter(Post.id == post_id).first()
        post.total_likes += 1

        db.commit()
        return {"message": "Post liked successfully"}


@router.post("/posts/{post_id}/comment", status_code=status.HTTP_201_CREATED)
def comment_post(post_id: int, user_id: int, text: str, db: Session = Depends(get_db)):
    new_comment = Comment(post_id=post_id, user_id=user_id, text=text)
    db.add(new_comment)
    db.commit()
    return {"message": "Comment added successfully"}

@router.get("/posts/{post_id}/comments", status_code=status.HTTP_200_OK)
def get_comments(post_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.post_id == post_id).all()
    return comments

@router.get("/posts", status_code=status.HTTP_200_OK)
def get_posts(user_id: int, db: Session = Depends(get_db)):
    try:
        # Query all posts and join with likes and comments for detailed information
        posts = db.query(Post).options(
            joinedload(Post.user),
            joinedload(Post.likes),
            joinedload(Post.comments).joinedload(Comment.user)  # Load user data for comments
        ).all()

        # Format the response to include relevant post data, user info, like count, and comments
        response = []
        for post in posts:
            liked_by_user = any(like.user_id == user_id for like in post.likes)  # Check if the user liked the post
            response.append({
                "id": post.id,
                "user": f"{post.user.first_name} {post.user.last_name}",
                "avatar": "/user1.jpg",  # Replace with actual avatar logic if available
                "goal": post.goal,
                "date": post.date,
                "image": post.image_url,
                "type": post.type,
                "likes": post.total_likes,
                "liked_by_user": liked_by_user,  # New field indicating if the user liked the post
                "comments": [
                    {
                        "id": comment.id,
                        "user": f"{comment.user.first_name} {comment.user.last_name}",
                        "text": comment.text,
                        "date": comment.date
                    }
                    for comment in post.comments
                ]
            })

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching posts: {str(e)}")
 
def get_user(user_id: int, db: Session):
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
   
@router.get("/water-consumption/{user_id}", status_code=status.HTTP_200_OK)
async def get_water_consumption(user_id: int, db: Session = Depends(get_db)):
    try:
        get_user(user_id, db)

        today = datetime.utcnow()
        start_of_today = today.replace(hour=0, minute=0, second=0, microsecond=0)

        # Fetch data for today
        today_water = db.query(func.sum(WaterConsumption.amount_ml)).filter(
            WaterConsumption.user_id == user_id,
            func.date(WaterConsumption.date) == date.today()
        ).scalar() or 0

        # Fetch data for the last 7 days (week)
        start_of_week = date.today() - timedelta(days=6)
        week_records = db.query(
            func.date(WaterConsumption.date).label('day'),
            func.sum(WaterConsumption.amount_ml).label('total')
        ).filter(
            WaterConsumption.user_id == user_id,
            func.date(WaterConsumption.date) >= start_of_week
        ).group_by('day').all()
        week_water_data = {record.day: record.total for record in week_records}
        week_water_list = [week_water_data.get(start_of_week + timedelta(days=i), 0) for i in range(7)]

        # Fetch data for the last 30 days (month)
        start_of_month = date.today() - timedelta(days=29)
        month_records = db.query(
            func.date(WaterConsumption.date).label('day'),
            func.sum(WaterConsumption.amount_ml).label('total')
        ).filter(
            WaterConsumption.user_id == user_id,
            func.date(WaterConsumption.date) >= start_of_month
        ).group_by('day').all()
        month_water_data = {record.day: record.total for record in month_records}
        month_water_list = [month_water_data.get(start_of_month + timedelta(days=i), 0) for i in range(30)]

        return {
            "today": today_water,
            "week": week_water_list,
            "month": month_water_list
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching water consumption data: {str(e)}")

# Endpoint for Caloric Intake
@router.get("/calories-intake/{user_id}", status_code=status.HTTP_200_OK)
async def get_calories_intake(user_id: int, db: Session = Depends(get_db)):
    try:
        get_user(user_id, db)

        today = datetime.utcnow()
        start_of_today = today.replace(hour=0, minute=0, second=0, microsecond=0)

        # Fetch data for today
        today_calories = db.query(func.sum(Food.calories)).join(FoodRecord).filter(
            FoodRecord.user_id == user_id,
            func.date(FoodRecord.date) == date.today()
        ).scalar() or 0

        # Fetch data for the last 7 days (week)
        start_of_week = date.today() - timedelta(days=6)
        week_records = db.query(
            func.date(FoodRecord.date).label('day'),
            func.sum(Food.calories).label('total')
        ).join(Food).filter(
            FoodRecord.user_id == user_id,
            func.date(FoodRecord.date) >= start_of_week
        ).group_by('day').all()
        week_calories_data = {record.day: record.total for record in week_records}
        week_calories_list = [week_calories_data.get(start_of_week + timedelta(days=i), 0) for i in range(7)]

        # Fetch data for the last 30 days (month)
        start_of_month = date.today() - timedelta(days=29)
        month_records = db.query(
            func.date(FoodRecord.date).label('day'),
            func.sum(Food.calories).label('total')
        ).join(Food).filter(
            FoodRecord.user_id == user_id,
            func.date(FoodRecord.date) >= start_of_month
        ).group_by('day').all()
        month_calories_data = {record.day: record.total for record in month_records}
        month_calories_list = [month_calories_data.get(start_of_month + timedelta(days=i), 0) for i in range(30)]

        return {
            "today": today_calories,
            "week": week_calories_list,
            "month": month_calories_list
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching calories intake data: {str(e)}")
    
@router.get("/monthly-summary/{user_id}", status_code=status.HTTP_200_OK)
def get_monthly_summary(user_id: int, month: str, db: Session = Depends(get_db)):
    # If user_id is 1 and month is "2024-11", return the mock response
    if user_id == 1 and month == "2024-11":
        return {
            "completed": [1, 4, 9, 5, 6, 8],  # Array of days completed
            "missed": [2, 11],  # Array of days missed
            "planned": [12, 13, 15, 16, 18, 19, 20, 22, 23, 25, 26, 27, 29, 30],  # Array of days planned (as day numbers)
        }
    account_creation_date = datetime(2024, 11, 15)

    # Parse the month parameter to extract year and month number
    try:
        year, month_num = map(int, month.split('-'))
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid month format. Use YYYY-MM.")

    # Get the start and end date of the given month
    start_date = datetime(year, month_num, 1)
    if month_num == 12:
        end_date = datetime(year + 1, 1, 1) - timedelta(days=1)
    else:
        end_date = datetime(year, month_num + 1, 1) - timedelta(days=1)

    # Ensure planned days only start after account creation date
    planned_days = [
        day for day in range(1, end_date.day + 1)
        if datetime(year, month_num, day).weekday() in [0, 1, 3, 4, 5]  # Only Monday, Tuesday, Thursday, Friday, Saturday
        and datetime(year, month_num, day) >= account_creation_date
    ]

    # Fetch completed days from ExerciseRecord
    completed_records = db.query(func.extract('day', ExerciseRecord.date)).filter(
        ExerciseRecord.user_id == user_id,
        ExerciseRecord.date >= start_date,
        ExerciseRecord.date <= end_date
    ).distinct().all()
    completed_days = [int(day[0]) for day in completed_records]

    # Calculate missed days: planned days in the past that are not completed
    current_date = datetime.utcnow()
    missed_days = [day for day in planned_days if day not in completed_days and datetime(year, month_num, day) < current_date]

    return {
        "completed": completed_days,
        "missed": missed_days,
        "planned": planned_days,
    }

@router.get("/user-progress/{user_id}", status_code=status.HTTP_200_OK)
def get_user_progress(user_id: int, db: Session = Depends(get_db)):
    # Fetch user to validate if they exist
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Set the total number of days for a given period (e.g., current month)
    today = datetime.utcnow()
    start_of_month = today.replace(day=1)
    total_days = 30 # Days including today

    # Calculate workout progress
    completed_workouts = db.query(func.count(func.distinct(func.date(ExerciseRecord.date)))).filter(
        ExerciseRecord.user_id == user_id,
        ExerciseRecord.date >= start_of_month
    ).scalar()

    workout_progress = (completed_workouts / total_days) * 100 if total_days > 0 else 0

    # Calculate calorie intake progress
    completed_calorie_days = db.query(func.count(func.distinct(func.date(FoodRecord.date)))).filter(
        FoodRecord.user_id == user_id,
        FoodRecord.date >= start_of_month
    ).scalar()

    calorie_progress = (completed_calorie_days / total_days) * 100 if total_days > 0 else 0

    # Calculate water intake progress
    completed_water_days = db.query(func.count(func.distinct(func.date(WaterConsumption.date)))).filter(
        WaterConsumption.user_id == user_id,
        WaterConsumption.date >= start_of_month
    ).scalar()

    water_progress = (completed_water_days / total_days) * 100 if total_days > 0 else 0

    return {
        "workout_progress": workout_progress,
        "completed_workout_days": completed_workouts,
        "calorie_progress": calorie_progress,
        "completed_calorie_days": completed_calorie_days,
        "water_progress": water_progress,
        "completed_water_days": completed_water_days,
        "total_days": 30
    }
