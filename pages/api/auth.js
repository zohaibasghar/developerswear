import connectDB from "@/middleware/db";
import User from "@/models/User";
import pincodes from '@/pincodes.json'
const jwt = require("jsonwebtoken");
async function handler(req, res) {
  if (req.method === "POST") {
    jwt.verify(req.body.token, "key", async function (err, decoded) {
      let { email } = decoded;
      let user = await User.findOne(
        { email },
        { password: 0, _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
      );
      let city=pincodes[user.pincode][0]
      let state=pincodes[user.pincode][1]
      
      
      res.status(200).json({user,city,state});
      if (err) {
        res.status(401).json({ err });
      }
    });
  } else {
    res.status(400).json({ error: "Method not allowed!" });
  }
}

export default connectDB(handler);
