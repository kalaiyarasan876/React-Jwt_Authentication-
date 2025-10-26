const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
    const refreshToken = req.cookies?.refreshToken;

    if (!token && !refreshToken) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
   
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      if (!refreshToken) {
        return res.status(401).json({ message: "Access Denied. No refresh token." });
      }

      try {
    
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);
    
        const accessToken = jwt.sign({ id: decodedRefresh.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        req.user = decodedRefresh;
        return next();
      } catch (refreshErr) {
        return res.status(401).json({ message: "Invalid refresh token." });
      }
    }

  } catch (error) {
    next(error);
  }
};
