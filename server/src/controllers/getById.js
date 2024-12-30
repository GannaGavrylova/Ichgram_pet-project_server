import User from "../models/user.js";

async function getUserById(req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(id).select("-password").populate("posts");
    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }
    delete user.password;
    res.status(200).json({ message: "succes", data: [user] });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default getUserById;
