import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";
// $-title Update User Profile
// $-path  PATCH /api/v1/user/profile
// $-auth  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const {
    password,
    passwordConfirm,
    email,
    isEmailVerified,
    provider,
    roles,
    googleID,
    username,
  } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (password || passwordConfirm) {
    res.status(400);
    throw new Error("This route is not for password updates");
  }

  if (email || isEmailVerified || provider || roles || googleID) {
    res.status(400);
    throw new Error("You are not allowed to update that field on this route");
  }

  const fieldsToUpdate = req.body;

  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    { ...fieldsToUpdate },
    { new: true, runValidators: true }
  ).select("-refreshToken");

  res.status(200).json({
    success: true,
    message: `${user.firstName}, your profile was successfully updated`,
    updatedProfile,
  });
});

export default updateUserProfile;
