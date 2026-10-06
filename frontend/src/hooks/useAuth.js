import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { loginAdmin, logout as logoutAction, clearError } from "../store/slices/authSlice";

/**
 * Custom Hook: useAuth
 * Redux-backed authentication and session hook
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, adminUser, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const login = useCallback(
    async (credentials) => {
      const result = await dispatch(loginAdmin(credentials));
      return result;
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    token,
    adminUser,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    resetError,
  };
};

export default useAuth;
