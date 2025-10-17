import React, { useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import toast from "react-hot-toast";
import { useUserContext } from "../context/userContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading, isLoggingOut } = useUserContext(); // <-- thêm loading
  const toastShown = useRef(false);

  if (loading) {
    // Khi đang load user, không render gì hoặc render loading
    return null; // hoặc <div>Loading...</div>
  }

  const hasAccess = user && user.role === "ADMIN";

  if (!hasAccess && !toastShown.current && !isLoggingOut) {
    toast.error("Bạn không có quyền truy cập trang này");
    toastShown.current = true;
  }

  return hasAccess ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
