import bcrypt from "bcrypt";
import User from "../../models/user.js";

async function register(req, res) {
  const { username, email, password, fullname } = req.body;

  if (!username || !email || !password || !fullname) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const userName = await User.findOne({ username });
    if (userName) {
      return res.status(400).json({
        message: "User with this name already exists",
      });
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      fullname,
    });

    res.status(201).json({ message: "User was register succesfully" });
  } catch (error) {
    console.error("Error occured when registering user", error);
    res.status(500).json({ message: "Internal server error User register" });
  }
}

export default register;
