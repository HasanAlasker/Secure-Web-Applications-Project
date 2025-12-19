const admin = (req, res, next) => {
  if (!req.user) return res.status(401).send("Unauthorized. Please login");

  if (req.user.role !== "admin")
    return res.status(403).send("Access denied. Admin only");

  next();
};

export default admin;
