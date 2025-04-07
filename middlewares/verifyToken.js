const jwt = require('jsonwebtoken');
//Verify Token
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'invalide token' });
    }
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}
// Verify tiken & Authorize the user
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'Yoou are not Allowed ' });
    }
  });
}
// Verify tiken & Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: 'Yoour are not Allowed,only Allowed For Admin ' });
    }
  });
}
module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
