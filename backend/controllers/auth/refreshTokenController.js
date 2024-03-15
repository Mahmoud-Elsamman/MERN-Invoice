import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";

// $-title Get new access tokens from the refresh token
// $-path  GET /api/v1/auth/new_access_token
// $-auth  Public

const newAccessToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  const options = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "None",
  };

  res.clearCookie("jwt", options);

  const user = await User.findOne({ refreshToken }).exec();

  if (!user) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }

        const hackedUser = await User.findOne({ _id: decoded.id }).exec();

        hackedUser.refreshToken = [];

        await hackedUser.save();
      }
    );

    return res.sendStatus(403);
  }

  const newRefreshTokenArray = user.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        user.refreshToken = [...newRefreshTokenArray];
        await user.save();
      }

      if (err || decoded.id !== user._id.toString()) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          roles: user.roles,
        },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: "1h" }
      );

      const newRefreshToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_REFRESH_SECRET_KEY,
        { expiresIn: "1d" }
      );

      user.refreshToken = [...newRefreshTokenArray, newRefreshToken];

      await user.save();

      const options = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      };

      res.cookie("jwt", newRefreshToken, options);

      res.json({
        success: true,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        username: existingUser.username,
        provider: existingUser.provider,
        avatar: existingUser.avatar,
        accessToken,
      });
    }
  );
});

export default newAccessToken;
