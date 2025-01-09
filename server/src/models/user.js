import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  bio: { type: String, default: "" },
  profileImage: { type: String, default: "" },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers_count: { type: Number, default: 0 },
  following_count: { type: Number, default: 0 },
  post_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
