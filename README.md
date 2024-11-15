# Power Path Guys

## Project Overview
**Power Path Guys** is a fitness-focused web application designed to assist students new to exercising in maintaining consistent workout routines. By providing structured exercise plans, flexible diet tracking, and motivational tools, the app tackles common challenges such as lack of guidance and motivation.

### Problem
Many students struggle to start and maintain an effective fitness routine due to limited knowledge and motivation. This app aims to simplify fitness and promote long-term engagement.

### Solution Features
- **Workout Plans**: Personalized plans tailored to user fitness goals and suggested exercises targeting specific muscle groups.
- **Diet Tracker**: Tracks calories, macros, and water intake for comprehensive diet management.
- **Forum**: A space to share fitness progress and motivate friends.
- **Goal Tracker**: Keeps users accountable for their fitness milestones.

## Technologies and Tools

### Frontend
- **Libraries**:
  - React.js
  - Next.js
  - Material-UI (MUI)
  - Aceternity UI
  - Chart.js
  - Framer Motion
- **CSS Tools**:
  - Tailwind CSS
  - Animate.css
- **Navigation**:
  - `next/navigation`

### Backend
- **Framework**: Python (FastAPI)
- **Tools**:
  - Postman
  - Swagger
- **Authentication**: OAuth2
- **Database**:
  - PostgreSQL
- **Image Storage**: Flickr

### APIs Used
- **ExerciseDB**: Used for workout data.
- **Mailgun**: For sending registration and reminder emails.

## Deployment
- **Platform**: AWS EC2 Instance
- **Containerization**: Docker

## How It Works
## Local Deployment Tutorial

To run the project locally using Docker Compose, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/julian-m-willis/power-path-guys.git
   cd power-path-guys
   docker-compose up

  Frontend will be available in localhost:80, and backend in localhost:5006/docs
