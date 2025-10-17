import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosIntence";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext, useUserContext } from "../../context/userContext";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ setIsOpen, switchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { updateUser } = useUserContext();
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;
      console.log(response.data);
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate(window.location.pathname);
        }
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-6 border rounded-md shadow-md bg-white text-black">
      <div className="text-black m-15">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <form onSubmit={handleLogin} className="space-y-4 flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className=" w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-900"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-md pb-2.5">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded"
          >
            Đăng nhập
          </button>
          <p className="mt-4 text-center">
            Chưa có tài khoản?{" "}
            <button
              onClick={switchToSignUp}
              className="text-blue-600 hover:underline"
              type="button"
            >
              Đăng ký ngay
            </button>
          </p>
        </form>

        <div className="my-3 text-center text-gray-500">Hoặc</div>

        <div
          onClick={() => {
            const currentUrl = window.location.href;
            sessionStorage.setItem("redirect", currentUrl);
            window.location.href = `${import.meta.env.VITE_BASE_URL}${
              API_PATHS.AUTH.GOOGLE
            }`;
          }}
          className="flex border-1 rounded justify-center items-center py-3 border-gray-500 cursor-pointer"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google icon"
            className="w-5 h-5 mr-2"
          />
          Login with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
