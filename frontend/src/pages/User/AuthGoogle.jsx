// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useUserContext();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const user = searchParams.get("user");
    if (token) {
      // Lưu token vào localStorage (hoặc cookie)
      localStorage.setItem("token", token);
      updateUser({ ...user, token });

      // Redirect based on role
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
        scrollTo(0, 0);
      } else {
        const redirectUrl = sessionStorage.getItem("redirect") || "/";
        window.location.href = redirectUrl;
      }
    } else {
      navigate("/"); // fallback
    }
  }, [location, navigate]);

  return <p>Đang đăng nhập...</p>;
}
