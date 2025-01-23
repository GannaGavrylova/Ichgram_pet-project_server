import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
// import upload from "../config/multerConfig.js";
import upload from "../middlewares/multer.js";
import User from "../models/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId)
      .select(["-password", "-created_at"])
      .populate("posts");

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    res.status(200).json({ status: "ok", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while fetching user's data." });
  }
};

export const updeteUserProfile = async (req, res) => {
  // upload(req, res, async function (err) {
  //   if (err) {
  //     console.error("Ошибка загрузки файла: ", err); // Логируем ошибку в терминал
  //     return res.status(400).json({ message: err.message }); // Отправляем ошибку клиенту
  //   }

  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password");
    // console.log(user);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    // Обновляем текстовые данные профиля
    const { username, bio } = req.body;
    if (username) user.username = username;
    if (bio) user.bio = bio;
    // если файл загружен обрабатываем его

    if (req.file) {
      // console.log("req.file: ", req.file);
      // console.log("req.body: ", req.body);
      const base64Image = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
      user.profileImage = base64Image;
    }

    // if (req.file) {
    //   const filePath = path.join(
    //     __dirname,
    //     "../../../uploads",
    //     req.file.filename
    //   );
    //   console.log("Файл загружен по пути:", filePath);
    //   // Чтение файла и конвертация в Base64
    //   const image = fs.readFileSync(filePath); // Чтение файла
    //   const base64Image = image.toString("base64"); // Преобразование в строку base64

    //   // Создание строки Base64 для изображения
    //   const base64EncodedImage = `data:${req.file.mimetype};base64,${base64Image}`;
    //   console.log("Base64 строка изображения: ", base64EncodedImage);

    //   // Обновляем изображение профиля
    //   user.profileImage = base64EncodedImage;
    // }
    // Сохраняем изменения в базе данных
    const updatedUser = await user.save();
    console.log("Профиль пользователя обнавлен: ", updatedUser);

    return res.status(200).json({
      message: "Профиль пользователь успешно обновлен!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Ошибка при обновлении профиля пользователя: ", err);
    return res
      .status(500)
      .json({ message: "Ошибка при сохранении изображения" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error get users", error });
  }
};

export const uploadProfileImage = upload.single("profileImage");
