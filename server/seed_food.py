import csv
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Food, Base

# Create the tables if they don't exist
Base.metadata.create_all(bind=engine)

# Function to seed the data
def seed_food_data():
    db = SessionLocal()
    try:
        with open('data/foods.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                # Check if the food already exists to avoid duplication
                existing_food = db.query(Food).filter(Food.name == row['name']).first()
                if not existing_food:
                    new_food = Food(
                        name=row['name'],
                        calories=float(row['calories']),
                        protein=float(row['protein']),
                        fat=float(row['fat'])
                    )
                    db.add(new_food)
            db.commit()
            print("Food data seeded successfully.")
    except Exception as e:
        print(f"Error seeding food data: {e}")
    finally:
        db.close()

# Run the seed function
if __name__ == "__main__":
    seed_food_data()
