from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine
from typing import Annotated, List, Dict
from routers import diet, auth, workout, goals
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # Allows all origins
    allow_credentials=True,        # Allow cookies and credentials
    allow_methods=["*"],           # Allow all methods: GET, POST, etc.
    allow_headers=["*"],           # Allow all headers
)

@app.get("/healthy")
def health_check():
    return {'status': 'Healthy'}

# app.include_router(diet.router)
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(diet.router, prefix="/diet", tags=["Diet"])
app.include_router(workout.router, prefix="/workout", tags=["Workout"])
app.include_router(goals.router, prefix="/goal", tags=["Goal"])
