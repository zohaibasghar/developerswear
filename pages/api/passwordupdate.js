import connectDB from "@/middleware/db";
import User from "@/models/User";
let CryptoJS = require("crypto-js");
async function handler(req, res) {
  if (req.method === "PUT") {
    let user = await User.findOne({ email: req.body.email });

    var bytes = CryptoJS.AES.decrypt(user.password, "key");
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (req.body.passCred.oPass === decrypted) {
      if (decrypted === req.body.passCred.nPass) {
        res
          .status(401)
          .json({ success: false, error: "Old and New passwords are same!" });
        return;
      }
      if (req.body.passCred.cPass === req.body.passCred.nPass) {
        await User.findOneAndUpdate(
          { email: req.body.email },
          {
            password: CryptoJS.AES.encrypt(
              req.body.passCred.nPass,
              "key"
            ).toString(),
          }
        );
        res.status(200).json({ success: true });
      } else {
        res
          .status(401)
          .json({ success: false, error: "New passwords does not match!" });
        return;
      }
    } else {
      res
        .status(401)
        .json({ success: false, error: "Old password is not valid!" });
      return;
    }
  } else {
    res.status(400).json({ error: "Method not allowed!" });
  }
}

export default connectDB(handler);
