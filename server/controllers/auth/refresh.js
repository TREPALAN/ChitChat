const jwt = require("jsonwebtoken");
require("dotenv").config();
const refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "expired refresh token" });
    }

    const token = jwt.sign(
      { _id: decoded._id, username: decoded.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const newRefreshToken = jwt.sign(
      { _id: decoded._id, username: decoded.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ token, refreshToken: newRefreshToken });
  });
};

module.exports = refresh;
