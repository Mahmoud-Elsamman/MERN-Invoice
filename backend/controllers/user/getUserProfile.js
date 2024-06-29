import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";
// $-title Get User Profile
// $-path  GET /api/v1/user/profile
// $-auth  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userProfile = await User.findById(userId, {
    refreshToken: 0,
    roles: 0,
    _id: 0,
  }).lean();

  if (!userProfile) {
    res.sendStatus(204);
    throw new Error("user profile not found");
  }

  res.status(200).json({
    success: true,
    userProfile,
  });
});

export default getUserProfile;
