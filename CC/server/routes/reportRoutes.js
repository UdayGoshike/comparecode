const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getHistory,
  getReport,
  getProfile,
  deleteReport   
} = require("../controllers/reportController");

router.get("/history", verifyToken, getHistory);

router.get("/profile", verifyToken, getProfile);

router.get("/:id", verifyToken, getReport);
router.delete("/:id", verifyToken, deleteReport);

module.exports = router;