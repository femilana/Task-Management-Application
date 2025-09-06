const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.cookies.web_token; // ✅ read from cookie

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = protect;
