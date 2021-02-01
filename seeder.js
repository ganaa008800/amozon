// файлын систэмтэй ажиллах
const fs = require("fs");
// mongoose хэрэгтэй
const mongoose = require("mongoose");
// өнгөтөөр хэвлэх library
const colors = require("colors");
//Database-рүү бичих учир config->config.env дотор холбоддог тохиргоо байгаа учираас dotenv оруулж ирнэ.
const dotenv = require("dotenv");

//model оруулж ирнэ.
const Category = require("./models/category");

//config->config.env файлаас уншин
dotenv.config({ path: "./config/config.env" });

// Database-тай холбогдох
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// холбогдсоны дараа data->categories.js доторхоо уншаад дотор нь бүх текст уншаад тэрийш json object-рүү болгож гаргаж ирнэ.
const categories = JSON.parse(
  fs.readFileSync(__dirname + "/data/categories.json", "utf-8")
);
//Үүссэн объектоо ашиглаж mogoDBруу шидэж үүсгэж өгий бүх category-уудаа
//импорт хийдэг функц хийж өгнө энэд байгаа файлуудаа database рүү импортлож оруулна.

const importData = async () => {
  try {
    await Category.create(categories);
    console.log("Өгөгдлийг импортлолоо...".green.inverse);
  } catch (err) {
    console.log(err.red);
  }
};

// data -аагаа устгаж цэвэрлэх шаардлага гардаг.
const deleteData = async () => {
  try {
    await Category.deleteMany();
    console.log("Өгөгдлийг бүгдийг устгалаа...".red.inverse);
  } catch (err) {
    console.log(err.red);
  }
};

//seeder.js comand prontoos дуудахдаа аргумент дамжуулдагаар хийе.
if (process.argv[2] == "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
