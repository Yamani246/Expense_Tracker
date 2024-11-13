# Expense Tracker

A web application that helps users track their expenses and manage their income. The project is built with a **React frontend** and a **Django backend** with Django REST Framework for API integration.

## Features

- **User Authentication**: Register, log in, and manage user accounts.
- **Expense Management**: Track and categorize expenses, edit and delete entries.
- **Income Management**: Record income sources and manage them.
- **Budgeting**: Set and track monthly budget goals.
- **Reports**: Generate summary reports of expenses and income.
- **Responsive Design**: Mobile-friendly UI built with React.

## Tech Stack

- **Frontend**: React.js, Axios (for API calls), CSS
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (default), PostgreSQL/MySQL (for production)
- **Authentication**: JWT-based Authentication
- **Version Control**: Git

## Installation

### Prerequisites

- Node.js (for React frontend)
- Python 3.8+ (for Django backend)
- Django 3.0+ (for backend)
- Django REST Framework
- SQLite/PostgreSQL/MySQL (depending on your configuration)

### Steps

1. Clone the Repository

    Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/expense_tracker.git
    cd expense_tracker

2. Set Up the Backend (Django)
- Navigate to the backend folder:

    ``` bash
    Copy code
    cd backend
- Create and activate a virtual environment:

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
- Install the backend dependencies:

    ```bash
    pip install -r requirements.txt
- Run database migrations:

    ```bash
    python manage.py migrate
- Create a superuser for accessing Django's admin panel:

    ```bash
    python manage.py createsuperuser
- Start the Django development server:

    ```bash
    Copy code
    python manage.py runserver
3. Set Up the Frontend (React)
- Navigate to the frontend folder:

    ```bash
    cd frontend

- Install the frontend dependencies:

    ```bash
    npm install
- Start the React development server:

    ```bash
    npm start
* The frontend should now be running at http://localhost:3000/, and the backend API at http://localhost:8000/.
