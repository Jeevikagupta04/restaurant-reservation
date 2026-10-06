/**
 * @file types.d.ts
 * Global TypeScript Definitions & Interface Declarations
 * Jeevika Restaurant Dining & Reservation Platform
 */

// ============================================================================
// Core Domain Entities
// ============================================================================

export type ReservationStatus = "Pending" | "Confirmed" | "Cancelled";

export interface Reservation {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // Exactly 10 numeric digits
  date: string;  // YYYY-MM-DD
  time: string;  // HH:MM
  status: ReservationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  id: string;
  name?: string;
  email: string;
  role?: string;
}

export interface ReservationStats {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
}

// ============================================================================
// API Requests & Payloads
// ============================================================================

export interface CreateReservationDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

export interface UpdateStatusDto {
  status: ReservationStatus;
}

export interface AdminLoginDto {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  count?: number;
  stats?: ReservationStats;
  reservation?: Reservation;
  reservations?: Reservation[];
  token?: string;
  admin?: AdminUser;
}

// ============================================================================
// React Form Inputs (Yup / React Hook Form)
// ============================================================================

export interface ReservationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

export interface AdminLoginFormData {
  email: string;
  password: string;
}

// ============================================================================
// Redux State Interfaces
// ============================================================================

export interface AuthState {
  token: string | null;
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ReservationState {
  reservations: Reservation[];
  stats: ReservationStats;
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: "All" | ReservationStatus;
  dateFilter: string;
}

export interface RootState {
  auth: AuthState;
  reservations: ReservationState;
}

// ============================================================================
// Common UI Component Props
// ============================================================================

export type ButtonVariant = "outline" | "filled" | "small";

export interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: React.ReactNode;
  to?: string;
  isScroll?: boolean;
  variant?: ButtonVariant;
  size?: "normal" | "small";
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  maxWidth?: string;
}

export interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export interface CommonBadgeProps {
  status: ReservationStatus | string;
  className?: string;
}
