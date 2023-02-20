import User from "@/models/User";
var CryptoJS = require("crypto-js");
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, name } = req.body;
      const user = await new User({
        name,
        email,
        password: CryptoJS.AES.encrypt(req.body.password, "key"),
      });
      await user.save();
      res.status(200).json({ result: "success" });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json("This method is not valid");
  }
}

export default connectDB(handler);