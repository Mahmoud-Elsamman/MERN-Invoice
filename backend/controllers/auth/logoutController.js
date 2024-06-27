import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";

const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.sendStatus(204);
    throw new Error("No cookie found");
  }

  const refreshToken = cookies.jwt;

  const existingUser = await User.findOne({ refreshToken });

  if (!existingUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.sendStatus(204);
  }

  existingUser.refreshToken = existingUser.refreshToken.filter(
    (reft) => reft !== refreshToken
  );

  await existingUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({
    success: true,
    message: `${existingUser.firstName}, you have been logged out successfully`,
  });
});

export default logoutUser;
