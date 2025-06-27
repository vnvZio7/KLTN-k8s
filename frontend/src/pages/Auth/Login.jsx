import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layouts/AuthLayout";
import Input from "../../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosIntence";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
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

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };
  const url = "https://api.themoviedb.org/3/movie/111?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzA4ZjUyNWZjNTFkMTg1M2YyZTEzM2U3MTc1MGY3MSIsIm5iZiI6MTY5NTQ0NzkwMi4yNTcsInN1YiI6IjY1MGU3YjVlYTkxMTdmMDBhYjY4MzMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4SPb9q1ebBR_VdtHonkUgDdMAjvEHSfiJX3qc4rm9sU",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));

  const url1 =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
  const options1 = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzA4ZjUyNWZjNTFkMTg1M2YyZTEzM2U3MTc1MGY3MSIsIm5iZiI6MTY5NTQ0NzkwMi4yNTcsInN1YiI6IjY1MGU3YjVlYTkxMTdmMDBhYjY4MzMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4SPb9q1ebBR_VdtHonkUgDdMAjvEHSfiJX3qc4rm9sU",
    },
  };

  fetch(url1, options1)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
  return (
    <AuthLayout>
      <form onSubmit={handleLogin}>
        <div className="m-5 ">
          <div>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="Enter your email"
              type="text"
            />
          </div>
          <div>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button className="bg-blue-500 p-3 cursor-pointer my-3" type="submit">
            Submit
          </button>
          <Link className="text-primary underline" to="/signup">
            SignUp
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
