const mongoose = require("mongoose");
const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    console.log("mongo already connected");
    mongoose.set("strictQuery", false);
    return handler(req, res);
  }
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Mongo Connected");
  return handler(req, res);
};

export default connectDB;
