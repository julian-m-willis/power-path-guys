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

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    goal = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    image_url = Column(String, nullable=True)
    type = Column(String, nullable=True)
    total_likes = Column(Integer, default=0)  # Denormalized like count

    user = relationship('Users', back_populates='posts')
    likes = relationship('Like', back_populates='post', cascade='all, delete-orphan')
    comments = relationship('Comment', back_populates='post', cascade='all, delete-orphan')

class Like(Base):
    __tablename__ = 'likes'

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('posts.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)

    post = relationship('Post', back_populates='likes')
    user = relationship('Users')

class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('posts.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    text = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)

    post = relationship('Post', back_populates='comments')
    user = relationship('Users')

# Add this line to the Users class:
Users.posts = relationship('Post', back_populates='user', cascade='all, delete-orphan')