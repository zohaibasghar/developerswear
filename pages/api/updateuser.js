import connectDB from "@/middleware/db";
import User from "@/models/User";
const jwt = require("jsonwebtoken");
async function handler(req, res) {
  if (req.method === "POST") {
    await User.findOneAndUpdate(
      { email: req.body.email },
      {
        name: req.body.name,
        address: req.body.address,
        pincode: req.body.pinCode,
        phone: req.body.phone,
      }
    );
    res.status(200).json({success:true});
  } else {
    res.status(400).json({ error: "Method not allowed!" });
  }
}

export default connectDB(handler);
