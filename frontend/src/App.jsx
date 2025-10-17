import React, { useContext, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

import PrivateRoute from "./routes/PrivateRoute";

import Dashboard from "./pages/Admin/Dashboard";

import HomePage from "./pages/User/HomePage";
import ManageCinemas from "./pages/Admin/ManageCinemas";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Movies from "./pages/User/Movies";
import MoviesDetails from "./pages/User/MoviesDetails";
import Layout from "./pages/Admin/Layout";
import ListShows from "./pages/Admin/ListShows";
import ListBookings from "./pages/Admin/ListBookings";
import AddShows from "./pages/Admin/AddShows";
import AuthLayout from "./components/layouts/AuthLayout";
import Release from "./pages/User/Release";
import SeatLayout from "./pages/User/SeatLayout";
import MyBookings from "./pages/User/MyBookings";
import Search from "./pages/User/Search";
import ReleaseDetails from "./pages/User/ReleaseDetails";
import { useUserContext } from "./context/userContext";
import PaymentPage from "./pages/User/Payment";
import AuthCallback from "./pages/User/AuthGoogle";
const App = () => {
  const { user } = useUserContext();

  return (
    <>
      <Toaster />
      {user?.role !== "ADMIN" && <Navbar />}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/movies/:id" element={<MoviesDetails />} />
        <Route path="/release/:id" element={<ReleaseDetails />} />
        <Route path="/release" element={<Release />} />
        <Route path="/seat" element={<SeatLayout />} />
        <Route path="/search" element={<Search />} />
        <Route path="/auth/google" element={<AuthCallback />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* <Route path="cinemas" element={<ManageCinemas />} /> */}
            <Route path="add-shows" element={<AddShows />} />
            <Route path="list-shows" element={<ListShows />} />
            <Route path="list-bookings" element={<ListBookings />} />
          </Route>
        </Route>
      </Routes>
      {user?.role !== "ADMIN" && <Footer />}
    </>
  );
};

export default App;

// const Root = () => {
//   const { user, loading } = useContext(UserContext);

//   console.log("user: ", user);
//   if (loading) return <Outlet />;
//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return user.role === "ADMIN" ? (
//     <Navigate to="/admin/dashboard" />
//   ) : (
//     <Navigate to="/" />
//   );
// };
