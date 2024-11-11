from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, Post, Users
from datetime import datetime

# Ensure all tables are created (only needed for first-time setup)
Base.metadata.create_all(bind=engine)

# Sample function to seed posts
def seed_posts():
    db = SessionLocal()
    try:
        # Check if there are already posts in the database to avoid duplicate seeding
        if db.query(Post).count() > 0:
            print("Posts already exist. Skipping seeding.")
            return

        # Fetch a user to associate with posts
        user = db.query(Users).first()
        if not user:
            print("No users found. Please seed the users table first.")
            return

        # Sample posts to be added
        posts = [
            Post(
                user_id=user.id,
                goal="Finished 30 consecutive days of morning yoga",
                date=datetime(2024, 10, 29),
                image_url="https://live.staticflickr.com/65535/54131660914_0dcd5bbbd0_b.jpg",
                type="workout",
                total_likes=15
            ),
            Post(
                user_id=user.id,
                goal="Completed 7-days of Calorie Deficit",
                date=datetime(2024, 10, 28),
                image_url="https://live.staticflickr.com/65535/54131278156_0083196005_b.jpg",
                type="diet",
                total_likes=20
            )
        ]

        # Add and commit posts to the database
        db.add_all(posts)
        db.commit()
        print("Sample posts added successfully.")

    except Exception as e:
        print(f"Error seeding posts: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_posts()
