const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.MONGO_DB_URL;

const connectDB = async () => {
  try {
    mongoose.connect(DB);
    console.log("DATABASE connected");
  } catch (err) {
    console.log("error : " + err.message);
  }
};

connectDB();
module.exports = connectDB;
