Restaurant Reservation System

A full-stack restaurant reservation web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. 
The application provides a responsive restaurant website where users can explore the restaurant, view popular dishes and team information, and submit table reservations through an online reservation form.

Features

- Responsive restaurant landing page
- Restaurant information and about section
- Popular dishes/menu section
- Restaurant qualities and statistics
- Team/chef section
- Online table reservation form
- Form validation on the backend
- MongoDB database for storing reservations
- Success and error notifications
- React Router based navigation
- Responsive mobile navigation


Frontend
- React.js
- Vite
- React Router
- Axios
- React Icons
- React Hot Toast
- React Scroll
- CSS

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv
- Validator

## Project Structure

Mern_Stack_Restaurant_Reservation/
│
├── backend/
│   ├── controller/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── Pages/
        ├── App.jsx
        ├── App.css
        ├── main.jsx
        └── restApi.json

The frontend is built with React and contains the restaurant UI and reservation form. 
When a user submits a reservation, the frontend sends the reservation details to the Express.js REST API using Axios.
The backend validates the submitted information and uses Mongoose to store the reservation in MongoDB. After successful storage, the API returns a confirmation message which is displayed to the user through a toast notification.

React Frontend
      │
      │ Axios POST Request
      ▼
Express REST API
      │
      ▼
Reservation Controller
      │
      ▼
Mongoose Model
      │
      ▼
MongoDB
      │
      ▼
Success Response
      │
      ▼
React Success Page

 API Endpoint

 Create Reservation

http
POST /api/v1/reservation/send


Request body:

json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "98765432101",
  "date": "2026-10-10",
  "time": "19:30"
}


## Environment Variables

Create a `config.env` file inside the `backend` directory:

PORT=4000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173


## Running the Project

### Backend

bash
cd backend
npm install
npm run dev

### Frontend

Open another terminal:

bash
cd frontend
npm install
npm run dev

The frontend will normally run on:

http://localhost:5173


and the backend on:

http://localhost:4000


Database

The application uses MongoDB with Mongoose. Reservation records are stored in the `RESERVATIONS` database using the `Reservation` schema.

Project Purpose

This project demonstrates how a React frontend can communicate with a Node.js/Express REST API and persist user-submitted reservation data in MongoDB using the MERN stack.
