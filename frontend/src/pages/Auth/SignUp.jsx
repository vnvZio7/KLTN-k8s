import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../../utils/axiosIntence";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = ({ switchToLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.name.trim()) return "Tên không được để trống";
    if (!form.email.trim()) return "Email không được để trống";
    // Simple email regex
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) return "Email không hợp lệ";
    if (form.password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
    if (form.password !== form.confirmPassword)
      return "Mật khẩu và xác nhận mật khẩu không khớp";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname: form.name,
        email: form.email,
        password: form.password,
        type: "local",
      });

      setSuccess("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Đã có lỗi xảy ra khi đăng ký");
    }
  };

  return (
    <div className="min-w-lg mx-auto mt-6 p-6 border rounded-md shadow-md bg-white text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký tài khoản</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Họ và tên</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Nhập họ và tên"
          required
        />

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Nhập email"
          required
        />

        <div className="relative ">
          <label className="block mb-2 font-semibold">Mật khẩu</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            placeholder="Nhập mật khẩu"
            required
          />
          <button
            type="button"
            className="absolute top-1/2 right-3  text-gray-500 hover:text-gray-900"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative ">
          <label className="block mb-2 font-semibold">Xác nhận mật khẩu</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mb-6 p-2 border rounded"
            placeholder="Nhập lại mật khẩu"
            required
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-900"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Đăng ký
        </button>
        <p className="mt-4 text-center">
          Đã có tài khoản?{" "}
          <button
            onClick={switchToLogin}
            className="text-blue-600 hover:underline"
            type="button"
          >
            Đăng nhập ngay
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
