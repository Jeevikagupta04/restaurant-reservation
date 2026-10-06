# 🍽️ Restaurant Reservation System — Backend API

Robust RESTful API service built with **Node.js**, **Express.js**, and **MongoDB Atlas** for managing guest dining reservations and authenticated staff administration.

---

## 🚀 Tech Stack & Dependencies

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js (ESM modules)
- **Database:** MongoDB Atlas via Mongoose ODM
- **Authentication:** JSON Web Tokens (`jsonwebtoken`)
- **Password Security:** `bcryptjs` with 10 salt rounds
- **Validation:** `validator` package & Mongoose schema validators
- **CORS & Environment:** `cors`, `dotenv`

---

## 📂 Architecture & Directory Structure

```
backend/
├── controller/
│   ├── admin.js             # Admin authentication logic (login)
│   └── reservation.js       # CRUD operations for reservations
├── database/
│   ├── dbConnection.js      # MongoDB Atlas connection handler
│   └── seedAdmin.js         # Automated default admin seeder
├── middlewares/
│   ├── auth.js              # JWT Bearer token authentication guard
│   ├── catchAsyncErrors.js  # Async exception wrapper
│   └── error.js             # Centralized ErrorHandler middleware
├── models/
│   ├── admin.js             # Admin credentials schema & bcrypt hashing
│   └── reservation.js       # Reservation schema with strict 10-digit phone validator
├── routes/
│   ├── adminRoute.js        # /api/v1/admin endpoints
│   └── reservationRoute.js  # /api/v1/reservation endpoints
├── .env.example             # Template for environment variables
├── app.js                   # Express application setup & middleware configuration
├── package.json
└── server.js                # Server entrypoint with DB connection & admin seeding
```

---

## ⚙️ Environment Variables

Create a `.env` or `config.env` file in the `backend/` directory:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/RESTAURANT?retryWrites=true&w=majority
JWT_SECRET=super_secret_restaurant_jwt_key_2026
ADMIN_EMAIL=admin@jeevika.com
ADMIN_PASSWORD=Admin@1234
```

*(See `.env.example` for reference)*

---

## 🚦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start in Development Mode (with hot-reload via nodemon)
```bash
npm run dev
```

### 3. Start in Production Mode
```bash
npm start
```

Upon startup, the server automatically:
1. Connects to **MongoDB Atlas**.
2. Checks if the default admin account exists. If not, it hashes the password with `bcryptjs` and seeds the admin record into the database.

---

## 📡 API Reference

### 1. Public Endpoints (Guest Access)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/reservation/send` | Submit a new table booking | `{ firstName, lastName, email, phone, date, time }` |

> **Validation Rules:**
> - `firstName`, `lastName`: 3 to 30 characters.
> - `email`: Valid RFC 5322 email format.
> - `phone`: Exactly **10 numeric digits** (e.g. `9876543210`).

#### Sample Payload:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "date": "2026-10-15",
  "time": "19:30"
}
```

---

### 2. Admin Authentication

| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/admin/login` | Authenticate staff admin & receive JWT | `{ email, password }` |

#### Default Seed Credentials:
- **Email:** `admin@jeevika.com`
- **Password:** `Admin@1234`

#### Sample Response:
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "67...",
    "name": "Head Manager",
    "email": "admin@jeevika.com"
  }
}
```

---

### 3. Protected Endpoints (Requires `Authorization: Bearer <TOKEN>`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/reservation/getall` | Retrieve all reservations sorted by newest first, plus summary stats (`total`, `confirmed`, `pending`, `cancelled`). |
| `PUT` | `/api/v1/reservation/:id/status` | Update booking status (`Pending`, `Confirmed`, or `Cancelled`). |
| `DELETE` | `/api/v1/reservation/:id` | Permanently remove a reservation from MongoDB Atlas. |

---

## 🛡️ Error Handling

All controller errors are normalized through the centralized `errorMiddleware`:
```json
{
  "success": false,
  "message": "Phone number must contain exactly 10 digits!"
}
```
HTTP status codes returned:
- `200` / `201`: Success
- `400`: Validation error / Bad request
- `401`: Missing or invalid JWT token
- `404`: Resource not found
- `500`: Internal server error
