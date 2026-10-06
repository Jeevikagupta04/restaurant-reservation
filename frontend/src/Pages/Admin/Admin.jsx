import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  HiOutlineSearch,
  HiOutlineRefresh,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineDownload,
  HiOutlinePlus,
  HiOutlineArrowLeft,
  HiOutlineUsers,
  HiOutlineLockClosed,
  HiOutlineLogout,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import "./Admin.css";
import { CommonButton, CommonModal, CommonBadge } from "../../components/common";
import { useAuth, useReservations, useModal } from "../../hooks";
import { adminLoginSchema, reservationSchema } from "../../validation/schemas";

const Admin = () => {
  // Redux Auth Hook
  const {
    token,
    adminUser,
    isAuthenticated,
    loading: authLoading,
    login,
    logout,
  } = useAuth();

  // Redux Reservations Hook
  const {
    reservations,
    filteredReservations,
    stats,
    loading: reservationsLoading,
    actionLoading,
    searchQuery,
    statusFilter,
    dateFilter,
    loadReservations,
    changeStatus,
    removeReservation,
    createReservation,
    onSearchChange,
    onStatusChange,
    onDateChange,
  } = useReservations();

  // Modal Custom Hooks
  const createModal = useModal();
  const deleteModal = useModal();

  // Target item for custom delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 1. Admin Login Form (react-hook-form + Yup)
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    setValue: setLoginValue,
    formState: { errors: loginErrors, isSubmitting: isLoggingIn },
  } = useForm({
    resolver: yupResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Admin Create Booking Form (react-hook-form + Yup)
  const {
    register: registerBooking,
    handleSubmit: handleBookingSubmit,
    reset: resetBooking,
    formState: { errors: bookingErrors, isSubmitting: isBookingSubmitting },
  } = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
    },
  });

  // Hydrate data when authenticated
  useEffect(() => {
    if (token) {
      loadReservations();
    }
  }, [token, loadReservations]);

  // Quick fill demo credentials helper
  const handleFillDemoCreds = () => {
    setLoginValue("email", "admin@jeevika.com", { shouldValidate: true });
    setLoginValue("password", "Admin@1234", { shouldValidate: true });
    toast.success("Demo credentials filled!");
  };

  // Submit Admin Login
  const onLogin = async (formData) => {
    try {
      const result = await login(formData);
      if (result?.error) {
        toast.error(result.payload || "Invalid credentials!");
      } else {
        toast.success(result.payload?.message || "Welcome back, Admin!");
        loadReservations();
      }
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  // Status Change (Confirmed, Cancelled, Pending)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const result = await changeStatus(id, newStatus);
      if (result?.error) {
        toast.error(result.payload || "Failed to update status");
      } else {
        toast.success(`Status updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error(err?.message || "Failed to update status");
    }
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (item) => {
    setDeleteTarget({
      id: item._id,
      guestName: `${item.firstName} ${item.lastName}`,
      email: item.email,
      phone: item.phone,
      date: item.date,
      time: item.time,
    });
    deleteModal.open();
  };

  // Execute Confirmed Delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const result = await removeReservation(deleteTarget.id);
      if (result?.error) {
        toast.error(result.payload || "Failed to delete reservation");
      } else {
        toast.success("Reservation deleted successfully!");
        deleteModal.close();
        setDeleteTarget(null);
      }
    } catch (err) {
      toast.error(err?.message || "Failed to delete reservation");
    }
  };

  // Create Manual Reservation from Modal
  const onCreateBooking = async (formData) => {
    try {
      const result = await createReservation(formData);
      if (result?.error) {
        toast.error(result.payload || "Failed to create reservation");
      } else {
        toast.success("Reservation Created Successfully!");
        resetBooking();
        createModal.close();
        loadReservations();
      }
    } catch (err) {
      toast.error(err?.message || "Failed to create reservation");
    }
  };

  // Export filtered reservations to CSV
  const handleExportCSV = () => {
    if (filteredReservations.length === 0) {
      toast.error("No reservations to export!");
      return;
    }

    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Date",
      "Time",
      "Status",
      "Created At",
    ];
    const rows = filteredReservations.map((r) => [
      `"${r.firstName}"`,
      `"${r.lastName}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.date}"`,
      `"${r.time}"`,
      `"${r.status || "Pending"}"`,
      `"${r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `reservations_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export downloaded!");
  };

  // -------------------------------------------------------------
  // If Not Authenticated -> Show Login View
  // -------------------------------------------------------------
  if (!isAuthenticated && !token) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="login-icon-box">
            <HiOutlineShieldCheck />
          </div>

          <h2>ADMIN PORTAL</h2>
          <p>Please enter your credentials to manage reservations</p>

          <div className="demo-cred-box">
            <div className="demo-cred-info">
              <div>
                User: <strong>admin@jeevika.com</strong>
              </div>
              <div>
                Pass: <strong>Admin@1234</strong>
              </div>
            </div>
            <button
              type="button"
              className="demo-fill-btn"
              onClick={handleFillDemoCreds}
            >
              Fill Demo
            </button>
          </div>

          <form
            onSubmit={handleLoginSubmit(onLogin)}
            className="login-form-body"
            noValidate
          >
            <div className="login-input-group">
              <label>Email Address</label>
              <div className="login-input-wrapper">
                <HiOutlineMail />
                <input
                  type="email"
                  className="login-input"
                  placeholder="admin@jeevika.com"
                  {...registerLogin("email")}
                />
              </div>
              {loginErrors.email && (
                <span className="admin-field-error">
                  {loginErrors.email.message}
                </span>
              )}
            </div>

            <div className="login-input-group">
              <label>Password</label>
              <div className="login-input-wrapper">
                <HiOutlineLockClosed />
                <input
                  type="password"
                  className="login-input"
                  placeholder="••••••••"
                  {...registerLogin("password")}
                />
              </div>
              {loginErrors.password && (
                <span className="admin-field-error">
                  {loginErrors.password.message}
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <CommonButton
                text={authLoading || isLoggingIn ? "Signing In..." : "Sign In to Admin"}
                type="submit"
                disabled={authLoading || isLoggingIn}
                variant="filled"
              />
            </div>
          </form>

          <Link to="/" className="login-back-link">
            <HiOutlineArrowLeft />
            Return to Public Website
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Authenticated -> Full Redux-Powered Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="admin-wrapper">
      {/* Top Navigation */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand">
            <h1>
              JEEVIKA <span>RESTAURANT</span>
            </h1>
            <span className="admin-badge-portal">Admin Portal</span>
            <div className="live-indicator">
              <span className="live-dot"></span>
              MongoDB Atlas Live
            </div>
          </div>

          <div className="admin-nav-actions">
            {adminUser && (
              <div className="admin-user-pill">
                <span className="user-avatar-dot"></span>
                <span>{adminUser.name || adminUser.email}</span>
              </div>
            )}

            <button
              className="btn-theme-link"
              onClick={loadReservations}
              title="Refresh Data"
            >
              <HiOutlineRefresh />
              Refresh
            </button>

            <CommonButton
              text="New Booking"
              size="small"
              variant="filled"
              icon={<HiOutlinePlus />}
              onClick={createModal.open}
            />

            <Link to="/" className="btn-theme-link" title="Website Home">
              <HiOutlineArrowLeft />
              Website
            </Link>

            <button
              className="btn-theme-logout"
              onClick={() => {
                logout();
                toast.success("Logged out successfully!");
              }}
              title="Sign Out"
            >
              <HiOutlineLogout />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-container">
        {/* Metric Cards Grid */}
        <section className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <h3>Total Bookings</h3>
              <div className="stat-value">{stats.total || reservations.length}</div>
            </div>
            <div className="stat-icon total">
              <HiOutlineUsers />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3>Confirmed</h3>
              <div className="stat-value">{stats.confirmed || 0}</div>
            </div>
            <div className="stat-icon confirmed">
              <HiOutlineCheck />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3>Pending Review</h3>
              <div className="stat-value">{stats.pending || 0}</div>
            </div>
            <div className="stat-icon pending">
              <HiOutlineClock />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3>Cancelled</h3>
              <div className="stat-value">{stats.cancelled || 0}</div>
            </div>
            <div className="stat-icon total">
              <HiOutlineCalendar />
            </div>
          </div>
        </section>

        {/* Search & Filters Controls */}
        <section className="admin-controls-card">
          <div className="search-box">
            <HiOutlineSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, phone, or date..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
              <button
                key={status}
                className={`pill-btn ${statusFilter === status ? "active" : ""}`}
                onClick={() => onStatusChange(status)}
              >
                {status}
                <span className="pill-count">
                  {status === "All"
                    ? reservations.length
                    : status === "Pending"
                    ? stats.pending || 0
                    : status === "Confirmed"
                    ? stats.confirmed || 0
                    : stats.cancelled || 0}
                </span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="date"
              className="pill-btn"
              value={dateFilter}
              onChange={(e) => onDateChange(e.target.value)}
              title="Filter by Booking Date"
            />
            {dateFilter && (
              <button
                className="pill-btn"
                onClick={() => onDateChange("")}
                title="Clear date filter"
              >
                Clear Date
              </button>
            )}
            <button className="export-btn" onClick={handleExportCSV}>
              <HiOutlineDownload />
              Export CSV
            </button>
          </div>
        </section>

        {/* Table View */}
        <section className="admin-table-card">
          {reservationsLoading ? (
            <div className="state-box">
              <div className="state-spinner"></div>
              <p>Fetching reservations from MongoDB Atlas...</p>
            </div>
          ) : filteredReservations.length === 0 ? (
            <div className="state-box">
              <div className="state-empty-icon">🍽️</div>
              <h3>No reservations found</h3>
              <p>
                {searchQuery || statusFilter !== "All" || dateFilter
                  ? "Try clearing or adjusting your search filters."
                  : "No customer bookings have been received yet. Test by submitting one from the website!"}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Guest Details</th>
                    <th>Contact Information</th>
                    <th>Booking Schedule</th>
                    <th>Status</th>
                    <th>Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((item) => {
                    const initials = `${item.firstName?.[0] || ""}${
                      item.lastName?.[0] || ""
                    }`.toUpperCase();

                    return (
                      <tr key={item._id}>
                        <td>
                          <div className="guest-cell">
                            <div className="guest-avatar">{initials || "G"}</div>
                            <div className="guest-info">
                              <div className="guest-name">
                                {item.firstName} {item.lastName}
                              </div>
                              <div className="guest-sub">
                                Booked:{" "}
                                {item.createdAt
                                  ? new Date(item.createdAt).toLocaleDateString()
                                  : "Recent"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="contact-cell">
                            <div className="contact-item">
                              <HiOutlineMail />
                              <a href={`mailto:${item.email}`}>{item.email}</a>
                            </div>
                            <div className="contact-item">
                              <HiOutlinePhone />
                              <a href={`tel:${item.phone}`}>{item.phone}</a>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="schedule-badge">
                            <div className="schedule-date">
                              <HiOutlineCalendar />
                              {item.date}
                            </div>
                            <div className="schedule-time">
                              <HiOutlineClock />
                              {item.time}
                            </div>
                          </div>
                        </td>

                        <td>
                          <CommonBadge status={item.status || "Pending"} />
                        </td>

                        <td>
                          <div className="action-buttons">
                            {item.status !== "Confirmed" && (
                              <button
                                className="btn-icon-action confirm"
                                title="Confirm Reservation"
                                disabled={actionLoading}
                                onClick={() =>
                                  handleStatusChange(item._id, "Confirmed")
                                }
                              >
                                <HiOutlineCheck />
                              </button>
                            )}

                            {item.status !== "Cancelled" && (
                              <button
                                className="btn-icon-action cancel"
                                title="Cancel Reservation"
                                disabled={actionLoading}
                                onClick={() =>
                                  handleStatusChange(item._id, "Cancelled")
                                }
                              >
                                <HiOutlineX />
                              </button>
                            )}

                            <button
                              className="btn-icon-action delete"
                              title="Delete from Database"
                              disabled={actionLoading}
                              onClick={() => handleOpenDelete(item)}
                            >
                              <HiOutlineTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Manual Booking Modal with CommonModal + React Hook Form + Yup */}
      <CommonModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        title="New Reservation"
        subtitle="Manual walk-in or telephone booking entry"
        maxWidth="540px"
      >
        <form
          onSubmit={handleBookingSubmit(onCreateBooking)}
          className="modal-form"
          noValidate
        >
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="John"
                {...registerBooking("firstName")}
              />
              {bookingErrors.firstName && (
                <span className="admin-field-error">
                  {bookingErrors.firstName.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                {...registerBooking("lastName")}
              />
              {bookingErrors.lastName && (
                <span className="admin-field-error">
                  {bookingErrors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                {...registerBooking("email")}
              />
              {bookingErrors.email && (
                <span className="admin-field-error">
                  {bookingErrors.email.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Phone (10 Digits)</label>
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                {...registerBooking("phone")}
              />
              {bookingErrors.phone && (
                <span className="admin-field-error">
                  {bookingErrors.phone.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" {...registerBooking("date")} />
              {bookingErrors.date && (
                <span className="admin-field-error">
                  {bookingErrors.date.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" {...registerBooking("time")} />
              {bookingErrors.time && (
                <span className="admin-field-error">
                  {bookingErrors.time.message}
                </span>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-theme-link"
              onClick={createModal.close}
            >
              Cancel
            </button>
            <CommonButton
              text={
                actionLoading || isBookingSubmitting
                  ? "Booking..."
                  : "Create Reservation"
              }
              type="submit"
              disabled={actionLoading || isBookingSubmitting}
              variant="filled"
            />
          </div>
        </form>
      </CommonModal>

      {/* Delete Confirmation Modal using CommonModal */}
      <CommonModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        maxWidth="460px"
      >
        {deleteTarget && (
          <div className="delete-modal-inner">
            <div className="delete-modal-icon">
              <HiOutlineTrash />
            </div>

            <h2 className="delete-modal-title">Delete Reservation?</h2>

            <p className="delete-modal-subtitle">
              Are you sure you want to delete the reservation for{" "}
              <strong>{deleteTarget.guestName}</strong>?
            </p>

            <div className="delete-modal-details">
              <div className="delete-detail-row">
                <span className="detail-label">Schedule</span>
                <span className="detail-value">
                  {deleteTarget.date} at {deleteTarget.time}
                </span>
              </div>
              <div className="delete-detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{deleteTarget.email}</span>
              </div>
              <div className="delete-detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{deleteTarget.phone}</span>
              </div>
            </div>

            <div className="delete-modal-warning">
              ⚠️ This will permanently remove this record from your MongoDB database.
            </div>

            <div className="delete-modal-actions">
              <button
                type="button"
                className="btn-theme-link"
                disabled={actionLoading}
                onClick={deleteModal.close}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-delete-confirm"
                disabled={actionLoading}
                onClick={handleConfirmDelete}
              >
                {actionLoading ? "Deleting..." : "Delete Reservation"}
              </button>
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default Admin;
