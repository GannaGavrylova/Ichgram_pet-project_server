import User from "../models/user.js";
import Profile from "../models/profile.js";
import getUserById from "./user/getById.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const updateUserProfile = async (req, res) => {
  const userId = getUserById(req);
  //   req.params.id;
  //   const { bio, profileImage } = req.body;

  //   if (!bio && !profileImage) {
  //     return res.status(400).json({ message: "Please provide data to update" });
  //   }
  try {
    const user = await User.findById(userId).populate("profile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, bio } = req.body;

    if (name) user.name = name;
    if (bio) user.bio = bio;

    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");

      const base64EncodedImage = `data:${req.file.mimetype};base64,${base64Image}`;

      user.profile_image = base64EncodedImage;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
    // if (!user.profile) {
    //   const newProfile = await Profile.create({
    //     bio: bio || "",
    //     profileImage: profileImage || "",
    //   });
    //   user.profile = newProfile._id;
    //   await user.save();
    // } else {
    //   if (bio) user.profile.bio = bio;
    //   if (profileImage) user.profile.profileImage = profileImage;

    //   await user.profile.save();
    // }

    // res
    //   .status(200)
    //   .json({ message: "Profile updated sussessfully", data: user });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    res
      .status(500)
      .json({ message: "Internal server error updatefUserProfile" });
  }
};

export const uploadProfileImage = upload.single("profile_image");
