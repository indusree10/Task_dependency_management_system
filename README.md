# Task Dependency Management System

## Overview
This project is a Task Dependency Management System built using **Django REST Framework** for the backend and **React.js** for the frontend. It allows users to manage tasks, define dependencies, visualize dependency graphs, and automatically update task statuses based on dependencies.

## Features
- Create new tasks
- Update task status
- Delete tasks
- Add task dependencies
- Detect circular dependencies
- Display dependency information
- Dependency graph visualization using SVG
- Color-coded task statuses
- Form validation and user-friendly error messages

## Technologies Used
- Django
- Django REST Framework
- React.js
- Axios
- HTML5 SVG

## Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- GET `/api/tasks/`
- POST `/api/tasks/`
- PATCH `/api/tasks/<id>/`
- DELETE `/api/tasks/<id>/`
- POST `/api/tasks/<id>/dependencies/`

## Project Structure

```
backend/
frontend/
README.md
```

## Author

Indu Sree Vaddi
