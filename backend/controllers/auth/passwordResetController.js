import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";
import { link } from "fs";

const domainURL = process.env.DOMAIN;
const { randomBytes } = await import("crypto");

// $-title Send password reset email link
// $-path  POST /api/v1/auth/reset_password_request
// $-auth  Public

const resetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("You must provide an email address");
  }

  const existingUser = await User.findOne({ email }).select("-passwordConfirm");

  if (!existingUser) {
    res.status(400);
    throw new Error("User not found");
  }

  const verificationToken = await VerificationToken.findOne({
    _userId: existingUser._id,
  });

  if (verificationToken) {
    await verificationToken.deleteOne();
  }

  const resetToken = randomBytes(32).toString("hex");

  const newVerificationToken = await new VerificationToken({
    _userId: existingUser.id,
    token: resetToken,
    createdAt: Date.now(),
  }).save();

  if (existingUser && existingUser.isEmailVerified) {
    const emailLink = `${domainURL}/auth/reset_password?emailToken=${newVerificationToken.token}&userId=${existingUser._id}`;

    const payload = {
      name: existingUser.firstName,
      link: emailLink,
    };

    await sendEmail(
      existingUser.email,
      "Password Reset Request",
      payload,
      "./emails/templates/requestResetPassword.handlebars"
    );

    res.status(200).json({
      success: true,
      message: `Hey ${existingUser.firstName}, an email has been sent to your account with the password reset link`,
    });
  }
});

// $-title Reset User Password
// $-path  POST /api/v1/auth/reset_password
// $-auth  Public

const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword, userId, emailToken } = req.body;

  if (!password) {
    res.status(400);
    throw new Error("A password is required");
  }

  if (!confirmPassword) {
    res.status(400);
    throw new Error("A confirm password field is required");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password and confirm password doesn't match");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }

  const passwordResetToken = await VerificationToken.findOne({
    _userId: userId,
  });

  if (!passwordResetToken || passwordResetToken.token !== emailToken) {
    res.status(400);
    throw new Error(
      "Your token is either invalid or expired, Try resetting your password again"
    );
  }

  const user = await User.findById({
    _id: passwordResetToken._userId,
  }).select("-passwordConfirm");

  if (user && passwordResetToken) {
    user.password = password;
    await user.save();

    const payload = {
      name: user.firstName,
    };

    await sendEmail(
      user.email,
      "Password Reset Success",
      payload,
      "./emails/templates/resetPassword.handlebars"
    );

    res.json({
      success: true,
      message: `Hey ${user.firstName}, Your password reset was successful`,
    });
  }
});

export { resetPasswordRequest, resetPassword };
