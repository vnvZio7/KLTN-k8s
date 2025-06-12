require("dotenv").config();
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect Database
connectDB();

// Middleware
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/report", reportRoutes);

//Start Server
const PORT = process.env.PORT || 8888;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port: ${PORT} `)
);
