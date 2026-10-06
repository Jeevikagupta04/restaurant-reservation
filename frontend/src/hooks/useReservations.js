import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReservations,
  updateReservationStatus,
  deleteReservation,
  submitReservation,
  setSearchQuery,
  setStatusFilter,
  setDateFilter,
  clearReservationError,
} from "../store/slices/reservationSlice";

/**
 * Custom Hook: useReservations
 * Redux-backed hook managing dining reservations, async mutations, and search/filtering
 */
export const useReservations = () => {
  const dispatch = useDispatch();
  const {
    reservations,
    stats,
    loading,
    actionLoading,
    error,
    searchQuery,
    statusFilter,
    dateFilter,
  } = useSelector((state) => state.reservations);

  // Filtered reservations memoization
  const filteredReservations = useMemo(() => {
    return reservations.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.firstName?.toLowerCase().includes(q) ||
        item.lastName?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.phone?.includes(q) ||
        item.date?.includes(q);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesDate = !dateFilter || item.date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [reservations, searchQuery, statusFilter, dateFilter]);

  const loadReservations = useCallback(() => {
    return dispatch(fetchReservations());
  }, [dispatch]);

  const changeStatus = useCallback(
    (id, status) => {
      return dispatch(updateReservationStatus({ id, status }));
    },
    [dispatch]
  );

  const removeReservation = useCallback(
    (id) => {
      return dispatch(deleteReservation(id));
    },
    [dispatch]
  );

  const createReservation = useCallback(
    (formData) => {
      return dispatch(submitReservation(formData));
    },
    [dispatch]
  );

  const onSearchChange = useCallback(
    (query) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const onStatusChange = useCallback(
    (status) => {
      dispatch(setStatusFilter(status));
    },
    [dispatch]
  );

  const onDateChange = useCallback(
    (date) => {
      dispatch(setDateFilter(date));
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch(clearReservationError());
  }, [dispatch]);

  return {
    reservations,
    filteredReservations,
    stats,
    loading,
    actionLoading,
    error,
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
    clearError,
  };
};

export default useReservations;
