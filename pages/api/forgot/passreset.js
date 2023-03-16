import connectDB from "@/middleware/db";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
let CryptoJS = require("crypto-js");
async function handler(req, res) {
  if (req.method === "PUT") {
    let user = await User.findOne({ email: req.body.email });

    if (req.body.passCred.cPass === req.body.passCred.pass) {
      let user = await User.findOneAndUpdate(
        { email: req.body.email },
        {
          password: CryptoJS.AES.encrypt(req.body.passCred.pass, "key").toString(),
        }
      );
      res.status(200).json({ success: true, msg:"Password reset Successfully. Now login with new password." });
      await Forgot.deleteOne({ email: req.body.email });
    } else {
      res
        .status(401)
        .json({ success: false, error: "New passwords does not match!" });
      return;
    }
  } else {
    res.status(400).json({ error: "Method not allowed!" });
  }
}

export default connectDB(handler);
