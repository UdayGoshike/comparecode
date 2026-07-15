const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    analyzeSolution
} = require("../controllers/analyzeController");

router.post("/", verifyToken, analyzeSolution);

module.exports = router;