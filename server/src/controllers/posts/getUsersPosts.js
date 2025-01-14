import Post from "../../models/post.js";

const getUsersPosts = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : req.params.id;

    const posts = await Post.find({ user_id: userId }).sort({ created_at: -1 }); // Здесь выполняется запрос к базе данных, mы ищем все посты, у которых user_id соответствует userId, и сортируем их по полю created_at в порядке убывания (-1 — последние посты будут отображаться первыми).

    if (!posts) {
      return res.status(404).json({ message: "Posts is not found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error while retrieving posts: ", error);
    res.status(500).json({ message: "Invalid server error" });
  }
};

export default getUsersPosts;
