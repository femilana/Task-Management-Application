const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to create and send token in cookie
const sendToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie("web_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true if in production
    sameSite: "strict",
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  res.status(200).json({
    message: "success",
    username: user.username
  });
};

// REGISTER
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password });
    await user.save();

    sendToken(user, res); // ✅ set cookie
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    sendToken(user, res); // ✅ set cookie
  } catch (err) {
    next(err);
  }
};

// LOGOUT
exports.logout = (req, res) => {
  res.clearCookie("web_token");
  res.status(200).json({ msg: "Logged out successfully" });
};
