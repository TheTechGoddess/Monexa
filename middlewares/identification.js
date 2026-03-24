const jwt = require("jsonwebtoken");

exports.identifier = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization token is required",
    });
  }

  if (!/^Bearer\s+/i.test(token)) {
    return res.status(401).json({
      success: false,
      message: "Authorization token must use Bearer format",
    });
  }

  const rawToken = token.replace(/^Bearer\s*/i, "").trim();

  try {
    const decoded = jwt.verify(rawToken, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};