import User from "../models/user.js";
import Post from "../models/post.js";

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  console.log(query);
  try {
    const users = await User.find({
      username: { $regex: `^${query}`, $options: "i" },
    }).select(["_id", "username", "bio", "profileImage"]);

    res.status(200).json({ status: "ok", data: users });
  } catch (error) {
    res.status(500).json({ error: "Error when searching users" });
  }
};

export const searchPosts = async (req, res) => {
  const { query } = req.query;
  console.log(query);
  const filter = query
    ? {
        $or: [{ caption: { $regex: query, $options: "i" } }],
      }
    : {};

  try {
    const posts = await Post.find(filter);
    res
      .status(200)
      .json({ status: "Post ok", data: { count: posts.length, posts } });
  } catch (error) {
    res.status(500).json({ error: "Error when searching posts" });
  }
};
