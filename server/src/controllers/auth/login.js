import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import "dotenv/config";

const jwtSecret = process.env.SECRET_KEY || "lol";

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error Login" });
  }
}

export default login;
