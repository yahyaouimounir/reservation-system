module.exports = (req, res, next) => {
  if (req.auth && req.auth.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Accès interdit : admin uniquement" });
  }
};
