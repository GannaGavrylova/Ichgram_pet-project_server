import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const getPostComment = async (req, res) => {
  const { postId } = req.params;

  if (!postId) return res.status(400).json({ error: "Invalid post ID" });

  try {
    //first variant
    const comments = await Comment.find({ post_id: postId });

    //seconde variant
    // const post = await Post.findById(postId).populate("comments")
    // const comment = post.comments
    res.status(200).json({ status: "ok", data: comments });
  } catch (error) {
    res.status(500).json({ error: "Error when fetching comments" });
  }
};

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const { comment_text } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Such post is not found" });

    const comment = new Comment({
      post_id: postId,
      user_id: userId,
      comment_text,
    });

    await comment.save();
    post.comments.push(comment);

    post.comments_count += 1;
    await post.save();

    res.status(201).json({ status: "ok", data: comment });
  } catch (error) {
    res.status(500).json({ error: "Error when creating comment" });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment is not found delete" });
    }

    if (comment.user_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "Access denied" });
    }
    await Comment.findByIdAndDelete(commentId);

    const post = await Post.findById(comment.post_id);

    post.comments_count -= 1;

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await post.save();
    res.status(200).json({ message: "Comment was successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong! " });
  }
};
