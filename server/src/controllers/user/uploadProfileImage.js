// import { fileURLToPath } from "url";
// import fs from "fs";
// import path from "path";
// import upload from "../../config/multerConfig.js";
// import User from "../../models/user.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const uploadProfileImage = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       console.error("Ошибка загрузки файла: ", err); // Логируем ошибку в терминал
//       return res.status(400).json({ message: err.message }); // Отправляем ошибку клиенту
//     }

//     const userId = req.params.id;
//     try {
//       // Читаем файл и конвертируем в Base64
//       const filePath = path.join(
//         __dirname,
//         "../../../uploads",
//         req.file.filename
//       ); // Путь к загруженному файлу
//       console.log("Файл загружен по пути:", filePath);

//       // Чтение файла и конвертация в Base64
//       const image = fs.readFileSync(filePath); // Чтение файла
//       const base64Image = image.toString("base64"); // Преобразование в строку base64

//       // Создание строки Base64 для изображения
//       const base64EncodedImage = `data:${req.file.mimetype};base64,${base64Image}`;
//       console.log("Base64 строка изображения: ", base64EncodedImage);

//       const user = await User.findById(userId);

//       if (!user) {
//         return res.status(404).json({ message: "Пользователь не найден" });
//       }

//       user.profileImage = base64EncodedImage;
//       await user.save();

//       console.log("Изображение добавлено в профиль пользователя");
//       // Теперь base64Image можно сохранить в базе данных
//       return res.status(200).json({
//         message: "Файл успешно загружен!",
//         user,
//       });
//     } catch (error) {
//       console.error("Ошибка при обновлении профиля пользователя: ", err);
//       return res
//         .status(500)
//         .json({ message: "Ошибка при сохранении изображения" });
//     }
//   });
// };
