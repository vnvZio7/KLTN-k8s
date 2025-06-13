require("dotenv").config();
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import sequelize from "./config/sequelize";

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
// connectDB();

// Middleware
app.use(express.json());
//Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/report", reportRoutes);
async function connectWithRetry(retries = 5, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("Kết nối DB thành công!");
      return sequelize;
    } catch (error) {
      console.log(
        `Kết nối DB thất bại, thử lại lần ${i + 1} sau ${delay / 1000}s...`
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Không thể kết nối DB sau nhiều lần thử");
}
//Start Server
const PORT = process.env.PORT || 8888;
(async () => {
  try {
    await connectWithRetry();
    console.log("✅ Kết nối MySQL thành công.");

    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Không thể kết nối MySQL:", err);
  }
})();

// app.listen(PORT, "0.0.0.0", () =>
//   console.log(`Server running on port: ${PORT} `)
// );
