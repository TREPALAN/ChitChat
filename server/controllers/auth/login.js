const bcrypt = require("bcrypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  if (!(await bcrypt.compare(password, user.hashedPassword))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //   Generate JWT
  const token = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.json({ message: "Login successful", token, refreshToken, username });
};

module.exports = login;
