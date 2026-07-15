require("dotenv").config();

require("./config/db");

const reportRoutes = require("./routes/reportRoutes");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const verifyToken = require("./middleware/authMiddleware");

const app = express();

// Middleware FIRST
app.use(cors());
app.use(express.json());

// Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/report", reportRoutes);
app.get("/api/test", verifyToken, (req, res) => {
    res.json({
        message: "Protected Route",
        user: req.user
    });
});

app.get("/", (req, res) => {
     
    res.send("CompareCode Backend Running 🚀");
});

module.exports = app;