import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";
// $-title Delete User Account
// $-path  DELETE /api/v1/user/profile
// $-auth  Private

const deleteMyAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "Your user account has been deleted",
  });
});

export default deleteMyAccount;
