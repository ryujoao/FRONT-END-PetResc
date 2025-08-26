function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    const { role } = req.user; // veio do JWT pelo authMiddleware

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    next();
  };
}

module.exports = authorizeRole;