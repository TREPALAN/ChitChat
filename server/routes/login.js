const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { Cookies } = require("universal-cookie");
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  if (!(await bcrypt.compare(password, user.hashedPassword))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //   Generate JWT
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  //   Save refresh token
  const cookies = new Cookies();
  cookies.set("refresh_token", refreshToken, {});
  cookies.set("token", token, {});
  res.json({ message: "Login successful", token, refreshToken });
};

module.exports = login;
