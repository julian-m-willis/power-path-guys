from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class WaterConsumption(Base):
    __tablename__ = 'water_consumptions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    amount_ml = Column(Float, nullable=False)  # Amount in milliliters
    date = Column(DateTime, default=datetime.utcnow)

    user = relationship('Users', back_populates='water_consumptions')
    
class Food(Base):
    __tablename__ = 'foods'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    calories = Column(Float, nullable=False)
    protein = Column(Float)
    fat = Column(Float)

class FoodRecord(Base):
    __tablename__ = 'food_records'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    food_id = Column(Integer, ForeignKey('foods.id'), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)

    user = relationship('Users', back_populates='food_records')
    food = relationship('Food')

class ExerciseRecord(Base):
    __tablename__ = 'exercise_records'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    calories_burned = Column(Float, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)

    user = relationship('Users', back_populates='exercise_records')

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)

    food_records = relationship('FoodRecord', back_populates='user')
    exercise_records = relationship('ExerciseRecord', back_populates='user')
    water_consumptions = relationship('WaterConsumption', back_populates='user')
