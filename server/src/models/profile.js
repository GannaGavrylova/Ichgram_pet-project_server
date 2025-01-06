import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    bio: { type: String, default: "" },
    profileImage: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
