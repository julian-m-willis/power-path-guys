#!/bin/sh

# Run the seed script
python seed_food.py

# Start the server
exec uvicorn main:app --host 0.0.0.0 --port 80
