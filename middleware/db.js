const mongoose = require("mongoose");
const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    console.log("mongo already connected");
    mongoose.set("strictQuery", false);
    return handler(req, res);
  }
  await mongoose.connect("mongodb+srv://zohaib:dVqrzGs1eC5YVCTl@cluster0.ozggqrs.mongodb.net/test");
  console.log("Mongo Connected");
  return handler(req, res);
};

export default connectDB;

//  MongoDB atlas cred
// dVqrzGs1eC5YVCTl    zohaib         password
// QiCga2EhjyieDgfCk7pubTBtcCT3EClVKRJXPiZXtVyPLPcxqTD7YCwMW8bA62ge   API