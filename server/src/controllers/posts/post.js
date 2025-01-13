import getUserById from "../user/getById.js";
import User from "../../models/user.js";
import Post from "../../models/post.js";

export const createPost = async (req, res) => {
  const userId = req.user.id;

  const { caption } = req.body;

  try {
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Error user is not found" });
    }

    const post = new Post({
      user_id: userId,
      images: ["fileNumber1"],
      caption,
      creates_at: new Date(),
    });

    await post.save();
    user.post_count += 1;
    await user.save();

    return res.status(200).json({ status: "Ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when creating post" });
  }
};
