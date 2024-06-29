import express from "express";
import checkAuth from "../Middleware/checkAuthMiddleware.js";
import getUserProfile from "../controllers/user/getUserProfile.js";
import updateUserProfile from "../controllers/user/updateUserProfile.js";
import deleteMyAccount from "../controllers/user/deleteMyAccount.js";
import role from "../Middleware/roleMiddleware.js";
import getAllUserAccounts from "../controllers/user/getAllUsersAccounts.js";
const router = express.Router();

router
  .route("/profile")
  .get(checkAuth, getUserProfile)
  .patch(checkAuth, updateUserProfile)
  .delete(checkAuth, deleteMyAccount);

router
  .route("/all")
  .get(checkAuth, role.checkRole(role.ROLES.admin), getAllUserAccounts);
export default router;
