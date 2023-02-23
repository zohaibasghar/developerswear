import User from "@/models/User";
import connectDB from "@/middleware/db";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const http = require('http')
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      var user = await User.findOne({ email: req.body.email });
      var bytes = CryptoJS.AES.decrypt(user.password, "key");
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (user) {
        if (user.email == req.body.email && req.body.password == originalText) {
          var token = jwt.sign(
            {
              name: user.name,
              email: user.email,
            },
            "key"
          );
          res.setHeader("Set-Cookie", `auth-Token=${token}`);
          res.status(200).json({ result: true, token });
        } else {
          res.status(404).json({
            result: false,
            msg: "Your email or password is incorrect!",
          });
        }
      } else {
        res.status(401).json({ result: false, msg: "No such user" });
      }
    } catch (error) {
      res.status(501).json({ result: false, error });
    }
  } else {
    res.status(400).json("This method is not valid");
  }
}
export default connectDB(handler);
