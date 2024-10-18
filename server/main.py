from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine
from typing import Annotated, List, Dict
from pydantic import BaseModel, Field
from starlette import status
from models import MarketingContent, User

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/healthy")
def health_check():
    return {'status': 'Healthy'}


# app.include_router(diet.router)
# app.include_router(workout.router)
# app.include_router(goals.router)
