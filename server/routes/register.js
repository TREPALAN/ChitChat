const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if user already exists
  if (await User.findOne({ username })) {
    return res.status(409).json({ message: "Username already exists" });
  }
  if (await User.findOne({ email })) {
    return res.status(409).json({ message: "Email already in use" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = new User({ username, email, hashedPassword });
  await user.save();
  res.json({ message: "User registered successfully", hashedPassword });
};

module.exports = register;
