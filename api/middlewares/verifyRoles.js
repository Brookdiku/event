const verifyRoles = (...allowedRoles) => {
  const rolesArray = [...allowedRoles];
  return (req, res, next) => {
    if (!req?.roles)
      return res.status(403).json({ message: "your role is needed" }); // forbidden
    try {
      const roles = req?.roles;
      const verifiedRoles = req.roles
      .map((role) =>
        rolesArray.includes(role !== null ? role.toString() : null)
      )
      .find((val) => val === true);
    if (!verifiedRoles) return res.sendStatus(403); // forbidden
    next();
    } catch (error) {
      throw error;
    }
  };
};
module.exports = verifyRoles;
