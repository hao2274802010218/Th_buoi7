const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const productRoutes = require("./routes/productRoutes.js");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Khởi tạo ứng dụng
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Frontend trên localhost:3000

// Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/products", productRoutes);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message, stack: process.env.NODE_ENV === "production" ? null : err.stack });
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));