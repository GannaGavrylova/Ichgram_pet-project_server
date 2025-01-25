import Follow from "../models/follow.js";
import User from "../models/user.js";

export const getUserFollowers = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "User id is required" });

  try {
    const followers = await Follow.find({ followed_user_id: userId }).populate(
      "follower_user_id",
      "username"
    );

    res.status(200).json({ status: "ok", data: followers });
  } catch (error) {
    res.status(500).json({ error: "Error when getting followers" });
  }
};

export const getUserFollowing = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: "User id is required" });

  try {
    const followings = await Follow.find({ follower_user_id: userId }).populate(
      "followed_user_id",
      "username"
    );

    res.status(200).json({ status: "ok", data: followings });
  } catch (error) {
    res.status(500).json({ error: "Error when getting followings" });
  }
};

export const followUserPost = async (req, res) => {
  const { target_user_id } = req.params;
  const userId = req.user.id;

  if (!target_user_id)
    return res.status(400).json({ error: "User Id is required" });

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(target_user_id);

    if (!user || !targetUser) {
      return res.status(404).json({});
    }

    const existingFollow = await Follow.findOne({
      follower_user_id: userId,
      followed_user_id: target_user_id,
    });
    console.log(existingFollow);
    if (existingFollow) {
      return res
        .status(400)
        .json({ error: "You have already followed this user" });
    }

    const follow = new Follow({
      follower_user_id: userId,
      followed_user_id: target_user_id,
      created_at: new Date(),
    });

    await follow.save();

    user.following_count += 1;
    targetUser.followers_count += 1;

    await user.save();
    await targetUser.save();

    res.status(201).json({ status: "ok", data: follow });
  } catch (error) {
    res.status(500).json({ error: "Error when following user" });
  }
};

export const unfollowUser = async (req, res) => {
  const { target_user_id } = req.params;
  const userId = req.user.id;

  if (!target_user_id) {
    return res.status(400).json({ error: "Target users's id is required" });
  }
  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(target_user_id);

    if (!userId || !target_user_id) {
      return res.status(400).json({ error: "User is not found" });
    }

    const follow = await Follow.findOne({
      follower_user_id: userId, //кто подписан
      followed_user_id: target_user_id, //на кого подписан
    });

    if (!follow) {
      return res
        .status(400)
        .json({ error: "You haven't been followed this user" });
    }
    await Follow.findByIdAndDelete(follow._id);

    user.following_count -= 1;
    targetUser.followers_count -= 1;

    await user.save();
    await targetUser.save();

    res
      .status(201)
      .json({ message: "You have successfully unfollowed this user" });
  } catch (error) {
    res.status(500).json({ error: "Error when unfolljwing user" });
  }
};
