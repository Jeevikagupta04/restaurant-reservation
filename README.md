# 🍽️ Jeevika Restaurant Reservation System (Full-Stack MERN)

A production-ready, full-stack dining reservation platform architected with the **MERN Stack** (**M**ongoDB Atlas, **E**xpress.js, **R**eact 18 + Vite, **N**ode.js), **Redux Toolkit**, **React Hook Form**, and **Yup**.

The application features:
1. **Public Guest Portal:** High-end restaurant landing page with signature dishes, culinary team profiles, and reservation booking with strict 10-digit phone verification powered by **React Hook Form** and **Yup**.
2. **Secured Staff Admin Portal:** Protected by JWT authentication and Redux Toolkit state management. Staff can manage incoming reservations, change statuses (`Pending`, `Confirmed`, `Cancelled`), create phone/walk-in bookings, export filtered lists to CSV, and delete entries via custom animated confirmation modals.
3. **Enterprise Design System & Common Components:** Polymorphic `CommonButton`, accessible `CommonModal`, `CommonInput`, and `CommonBadge` components.
4. **Backend REST API:** Node.js + Express REST API with MongoDB Atlas, Mongoose schema validation, JWT auth, and bcrypt.

---

## 🏗️ Project Architecture

```
restaurant-reservation/
├── backend/                # Node.js + Express REST API (MongoDB Atlas, JWT, bcrypt)
│   ├── controller/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── README.md           # Express backend architecture & API reference
│   └── server.js
│
├── frontend/               # React 18 + Vite Single Page Application
│   ├── src/
│   │   ├── api/            # API client layer
│   │   ├── components/
│   │   │   ├── common/     # Reusable components (CommonButton, CommonModal, CommonInput, CommonBadge)
│   │   │   └── ...         # Section components (Hero, Menu, Reservation, etc.)
│   │   ├── hooks/          # Custom Hooks (useReservations, useAuth, useModal)
│   │   ├── store/          # Redux Toolkit store (authSlice, reservationSlice)
│   │   ├── validation/     # Yup schemas (reservationSchema, adminLoginSchema)
│   │   ├── types/          # TypeScript definitions (types.d.ts)
│   │   └── Pages/          # Admin Portal, Home, Success, 404
│   ├── README.md           # Frontend-specific architecture & component guide
│   └── vite.config.js
│
└── README.md               # Root repository overview
```

---

## ⚡ Quick Start

### 1. Setup Backend (Node.js & Express)
```bash
cd backend
npm install

# Create environment configuration
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string

npm run dev
```
*Backend runs on `http://localhost:4000` (auto-seeds default admin: `admin@jeevika.com` / `Admin@1234`).*

### 2. Setup Frontend (React 18 + Redux + Vite)
```bash
cd ../frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 🔑 Key Features Overview

| Feature | Details |
| :--- | :--- |
| **Strict 10-Digit Phone Validation** | Validated across database schema, Yup schema, and frontend input (`pattern="[0-9]{10}"`). Auto-filters non-numeric keystrokes. |
| **Redux Toolkit Architecture** | Global centralized state for `auth` (token, session hydration, user info) and `reservations` (memoized filtering, statistics calculation, async CRUD thunks). |
| **React Hook Form + Yup** | High-performance, schema-driven form validation with inline visual error feedback and touched state tracking. |
| **Reusable Common Components** | `CommonButton` (polymorphic scroll/router link), `CommonModal` (accessible dialog with scroll-lock & ESC dismiss), `CommonInput` (with forwardRef & error styling), `CommonBadge` (status pills). |
| **Custom Hooks** | `useReservations` (data & dispatch wrapper), `useAuth` (session & login methods), `useModal` (modal state & keyboard accessibility). |
| **JWT Admin Authentication** | Password hashed with `bcrypt`. Bearer token authentication on all administrative endpoints. |
| **Automated Admin Seeding** | On first startup, the server automatically creates the default administrator account in MongoDB (`admin@jeevika.com` / `Admin@1234`). |
| **CSV Export** | One-click spreadsheet export for manager reporting with filtered date and status ranges. |

---

## 📚 Detailed Documentation

- **[Frontend Web Application & Architecture Guide](./frontend/README.md)**
- **[Node.js / Express Backend API Documentation](./backend/README.md)**
