import bcrypt from "bcrypt";
import User from "../../models/user.js";

async function register(req, res) {
  const { name, email, password, fullname } = req.body;

  if (!name || !email || !password || !fullname) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ name, email });
    if (user) {
      return res.status(400).json({ message: "Such user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      fullname,
    });

    res.status(201).json({ message: "User was register succesfully" });
  } catch (error) {
    console.error("Error occured when registering user", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default register;
