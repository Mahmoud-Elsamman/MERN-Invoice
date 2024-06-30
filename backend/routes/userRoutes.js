import express from "express";
import checkAuth from "../Middleware/checkAuthMiddleware.js";
import getUserProfile from "../controllers/user/getUserProfile.js";
import updateUserProfile from "../controllers/user/updateUserProfile.js";
import deleteMyAccount from "../controllers/user/deleteMyAccount.js";
import role from "../Middleware/roleMiddleware.js";
import getAllUserAccounts from "../controllers/user/getAllUsersAccounts.js";
import deleteUserAccount from "../controllers/user/deleteUserAccount.js";
import deactivateUser from "../controllers/user/deactivateUser.js";
const router = express.Router();

router
  .route("/profile")
  .get(checkAuth, getUserProfile)
  .patch(checkAuth, updateUserProfile)
  .delete(checkAuth, deleteMyAccount);

router
  .route("/all")
  .get(checkAuth, role.checkRole(role.ROLES.admin), getAllUserAccounts);

router
  .route("/:id")
  .delete(checkAuth, role.checkRole(role.ROLES.admin), deleteUserAccount);

router
  .route("/:id/deactivate")
  .patch(checkAuth, role.checkRole(role.ROLES.admin), deactivateUser);
export default router;
