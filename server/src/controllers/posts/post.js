import User from "../../models/user.js";
import Post from "../../models/post.js";

export const createPost = async (req, res) => {
  const userId = req.user.id;

  const { caption } = req.body;

  try {
    const user = await User.findById(userId);

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
    user.posts.push(post);
    await user.save();

    return res.status(200).json({ status: "Ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when creating post" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user_id: req.user.id });
    res.status(200).json({ status: "ok", data: posts });
  } catch (error) {
    res.status(500).json({ error: "Error when fetching posts" });
  }
};
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (post.user_id !== req.user._id) {
      return res.status(403).json({ error: "Access danied" });
    }
    if (!post) {
      return res.status(404).json({ error: "Post is not found" });
    }
    await Post.findByIdAndDelete(postId);
    const user = await User.findById(post.user_id);
    user.post_count -= 1;

    await post_count.save();
    res.status(200).json({ message: "Post was deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error when deleting post" });
  }
};

export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate(
      "user_id",
      "username",
      "profileImage"
    );
    if (!post) {
      return res.status(404).json({ error: "Post is not found" });
    }

    res.status(200).json({ status: "ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when fetching post" });
  }
};

export const updatePost = async (req, res) => {
  const { postId } = req.params;

  const { caption, images } = req.body;

  try {
    const post = await Post.findById(postId);

    if (post.user_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "Access danied" });
    }

    if (!post) {
      return res.status(404).json({ error: "Post is not found" });
    }

    if (caption) post.caption = caption;
    if (images) post.images = images;

    await post.save();

    res.status(200).json({ status: "ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when fetching post" });
  }
};
