import multer from "multer";
import path from "path";

// Настройка хранилища для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); //Папка для хранения загруженных файлов
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// Ограничение на максимальный размер загружаемого файла (1MB)
const maxSize = 1 * 1000 * 1000;

// Создание Multer конфигурации
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error("Ошибка: Загружать можно только файлы формата JPEG, JPG, PNG")
    );
  },
}).single("mypic");

export default upload;
