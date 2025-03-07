import mongoose, { Schema } from "mongoose";

const verifyResetTokenSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  token: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 900,
  },
});

const verifyResetToken = mongoose.model(
  "VerifyResetToken",
  verifyResetTokenSchema
);

export default verifyResetToken;
