import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = data;
    next();
  });
};

export default authenticateJWT;
