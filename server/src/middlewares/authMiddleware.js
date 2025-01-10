import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["Authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = data;
    console.log("Authenticated user:", data);
    next();
  });
};

export default authenticateJWT;

// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// const authMiddleware = async (req, res, next) => {
//   const token = req.header("Authorization").replace("Bearer ", "");

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. Token hasn't been provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.user_id);

//     if (!user) {
//       return res.status(401).json({ message: "User is not found" });
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authMiddleware;
