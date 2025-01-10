import User from "../../models/user.js";
import mongoose from "mongoose";

async function getUserById(req, res, next) {
  const id = req.params.id;

  // if (!id) {
  //   return res.status(400).json({ message: "User ID is required" });
  // }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID format" });
  }
  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }
    console.log(user);
    res.status(200).json({ message: "succes", data: [user] });
  } catch (error) {
    console.error("Error details: ", error);
    res.status(500).json({ message: "Internal server error getUserById" });
  }
}

export default getUserById;
