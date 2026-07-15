const bcrypt = require("bcryptjs");
const connection = require("../config/db");

const signup = async (req, res) => {
  const { username, password } = req.body;

  const checkUserQuery = "SELECT * FROM users WHERE username = ?";

  connection.query(checkUserQuery, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";

    connection.query(insertQuery, [username, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "User Registered Successfully",
      });
    });
  });
};
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";

  connection.query(sql, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      message: "Login Successful",
      token,    
    });
  });
};
module.exports = {
  signup,
  login,
};
