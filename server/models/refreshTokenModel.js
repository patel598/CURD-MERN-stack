import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7 * 24 * 60 * 60, // This will automatically delete the token after 7 days
  },
});


const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

export default RefreshToken;