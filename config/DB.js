const mongoose = require("mongoose");

// Database -тай холбогддог код
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Холбогдлоо : ${conn.connection.host}`.magenta);
};

module.exports = connectDB;
