# 🍽️ Restaurant Reservation System — Frontend Web Application

Modern, responsive web application built with **React 18**, **Redux Toolkit**, **React Hook Form**, **Yup**, and **Vite**, featuring a luxury restaurant showcase landing page and a secured staff **Admin Portal**.

---

## 🚀 Tech Stack & Libraries

- **Framework:** React 18 + Vite (Ultra-fast HMR and ESM bundling)
- **State Management:** **Redux Toolkit (`@reduxjs/toolkit`)** + `react-redux`
- **Form Management:** **React Hook Form (`react-hook-form`)** with `@hookform/resolvers/yup`
- **Schema Validation:** **Yup** (Strict 10-digit phone regex, email, required bounds)
- **Custom Hooks:** `useReservations`, `useAuth`, `useModal`
- **Typings:** **TypeScript ambient definitions (`types.d.ts`)** for entities, DTOs, and component props
- **Common Component Suite:** `CommonButton`, `CommonModal`, `CommonInput`, `CommonBadge`
- **Routing:** React Router v6
- **Smooth Page Anchors:** `react-scroll`
- **HTTP Client:** Axios (v1.20+)
- **Notifications:** React Hot Toast
- **Icons:** React Icons (`react-icons/hi`, `react-icons/gi`, `react-icons/ri`)
- **Typography:** Google Fonts (`Oswald`)

---

## 📂 Architecture & Directory Structure

```
frontend/
├── public/                 # Static assets (images, logos, SVGs)
├── src/
│   ├── components/
│   │   ├── common/         # Barrel index for reusable design system components
│   │   ├── CommonButton/   # Polymorphic button (RouterLink, ScrollLink, standard button)
│   │   ├── CommonModal/    # Accessible modal dialog with scroll lock & ESC dismiss
│   │   ├── CommonInput/    # Input wrapper with forwardRef, labels & error messages
│   │   ├── CommonBadge/    # Status pill badge (Confirmed, Pending, Cancelled)
│   │   ├── About.jsx
│   │   ├── Dishes.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Menu.jsx
│   │   ├── Navbar.jsx
│   │   ├── Qualities.jsx
│   │   ├── Reservation.jsx # Guest reservation booking form (React Hook Form + Yup)
│   │   ├── Team.jsx
│   │   └── WhoAreWe.jsx
│   ├── hooks/              # Custom React Hooks
│   │   ├── useReservations.js # Redux-backed reservation CRUD & filtering
│   │   ├── useAuth.js         # Redux-backed admin auth, token & session handling
│   │   ├── useModal.js        # Accessible modal visibility, esc key & body scroll lock
│   │   └── index.js
│   ├── store/              # Redux Toolkit Global State
│   │   ├── slices/
│   │   │   ├── authSlice.js       # Admin authentication, token persistence, async thunks
│   │   │   └── reservationSlice.js # Reservations state, search/status filters, CRUD thunks
│   │   └── index.js        # Root store configuration
│   ├── validation/         # Yup Validation Schemas
│   │   ├── schemas.js      # reservationSchema, adminLoginSchema, statusUpdateSchema
│   │   └── index.js
│   ├── types/              # Ambient TypeScript Definitions
│   │   └── types.d.ts      # Models, DTOs, Redux State, and Component Props interfaces
│   ├── Pages/
│   │   ├── Admin/          # Authenticated Staff Management Portal
│   │   │   ├── Admin.jsx   # Redux + React Hook Form + Yup dashboard
│   │   │   └── Admin.css
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── NotFound/
│   │   │   └── NotFound.jsx
│   │   └── Success/
│   │       └── Success.jsx
│   ├── App.jsx             # Main Router configuration
│   ├── App.css             # Global typography, layout & component styles
│   ├── main.jsx            # Redux Provider + React DOM mount
│   └── restApi.json        # Static mock menus & navbar links
├── types.d.ts              # Root TypeScript ambient declarations
├── .env.example            # Environment configuration template
├── package.json
└── vite.config.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# URL where your Express backend is listening
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🚦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Vite Dev Server
```bash
npm run dev
```
The app will be live at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

---

## 🧩 Architectural Implementation Details

### 1. Reusable Common Components
- **`CommonButton`**: Polymorphic component supporting in-page scrolling (`isScroll`), route transitions (`to`), or form submissions with variants (`outline`, `filled`, `small`).
- **`CommonModal`**: Accessible dialog featuring ESC keyboard listener, background scroll locking, smooth scale transitions, and header actions.
- **`CommonInput`**: Form field with `forwardRef` support for `react-hook-form`, helper text, icon slots, and active error messaging.
- **`CommonBadge`**: Semantic status pill (`Confirmed`, `Pending`, `Cancelled`) with animated dot indicators.

### 2. Form Management & Yup Validation
- Integrated **`react-hook-form`** with **`@hookform/resolvers/yup`** for both public reservation booking and admin walk-in entries.
- **Strict 10-Digit Phone Rule**: Regex `^[0-9]{10}$` enforces exact numeric lengths and prevents invalid submissions.
- Inline validation error alerts with accessible ARIA tags (`aria-invalid="true"`).

### 3. Global Redux Toolkit Store
- **`authSlice`**: Handles session hydration from `localStorage`, JWT token decoding, and `loginAdmin` async thunk.
- **`reservationSlice`**: Manages reservation collection, search query state, status filter tabs, date filter, statistics calculation, and async thunks (`fetchReservations`, `updateReservationStatus`, `deleteReservation`, `submitReservation`).

### 4. Custom Hooks
- **`useReservations()`**: Selects memoized filtered reservations, stats, action loading flags, and wraps CRUD dispatchers.
- **`useAuth()`**: Selects authentication status, token, current admin profile, and dispatchers for login/logout.
- **`useModal(initialState)`**: Encapsulates open, close, and toggle handlers.

### 5. Ambient TypeScript Definitions (`types.d.ts`)
- Provides code intelligence and contract validation for:
  - `Reservation`, `AdminUser`, `ReservationStats`
  - `ReservationFormData`, `AdminLoginFormData`
  - `AuthSliceState`, `ReservationSliceState`, `RootState`, `AppDispatch`
  - `CommonButtonProps`, `CommonModalProps`, `CommonInputProps`, `CommonBadgeProps`
