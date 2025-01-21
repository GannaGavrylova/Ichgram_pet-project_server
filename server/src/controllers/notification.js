import User from "../models/user.js";
import Notification from "../models/Notification.js";

export const getUserNotification = async (req, res) => {
  const { userId } = req.params;

  if (!userId || userId !== req.user._id) {
    return res
      .status(403)
      .json({ error: "User Id is not valid or u don't have an access" });
  }

  try {
    const notification = await Notification.find({ user_id: userId }).sort({
      created_at: -1,
    });
    res.status(200).json({ status: "ok", data: notification });
  } catch (error) {
    res.status(500).json({ error: "Error when fetching notifications" });
  }
};
