const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
// colsole дээр өнгөтэй хэвлэх
const colors = require("colors");
//error middleware
const errorHandler = require("./middleware/error");
//MongoDB-тэй холбогдоход connectDB функцыг оруулж ирж байна.
const connectDB = require("./config/DB");
const rfs = require("rotating-file-stream"); // version 2.x
const categoriesRouters = require("./routes/categories");
const Logger = require("./middleware/logger");
//Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: "./config/config.env" });

//app-д express server-г дуудаж байна.
const app = express();
//MongoDB-тэй холбогдоход connectDB функцыг дуудаж байна.
connectDB();

//файлруу log хийдэг
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

//Энэд middleware-ууд байна.
//HTTP massege-ээр ирсэн massegeний body хэсэгт байгаа json мэдээллүүдийг уншиж аваад requist-ийн json руу хөрвүүлж өгдөг middleware байгаа. Category үүсгэх болон өөрчлөхөд орж ирж байгаа мэдээллүүдийг авч байгаа
app.use(express.json());
app.use(Logger);
app.use(morgan("combined", { stream: accessLogStream })); // morgan функц байж байдаг. Дотор dev дамжуулж байна.
app.use("/api/v1/categories", categoriesRouters);
//error middleware categoriesRouters олбосон холболтынхоо доор нь холбож өгнө.
app.use(errorHandler);
// server асаах функц
const server = app.listen(
  process.env.PORT,
  console.log(
    `Express server ${process.env.PORT} порт нь дээр ажиллаа....`.rainbow
  )
);
process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
