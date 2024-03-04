import { ADMIN, USER } from "../constants/index.js";
const ROLES = {
  user: USER,
  admin: ADMIN,
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user && !req?.roles) {
      res.status(401);
      throw new Error("Unauthorized access");
    }

    const roles = [...allowedRoles];

    //Better approch to find a match in the array of allowed roles
    // const isAllowed = req.roles.some((role) => roles.includes(ROLES[role]));
    // const role = req.roles.filter(role => roles.includes(role))

    const roleFound = req.roles
      .map((role) => roles.includes(role))
      .find((value) => value === true);

    if (!roleFound) {
      res.status(401);
      throw new Error("Unauthorized access");
    }

    next();
  };
};

const role = { ROLES, checkRole };

export default role;
