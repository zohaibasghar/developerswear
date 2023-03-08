import connectDB from "@/middleware/db";
const jwt = require("jsonwebtoken");
async function handler(req, res) {
  if (req.method === "POST") {
    jwt.verify(req.body.token, "key", async function (err, decoded) {
      res.status(200).json({ decoded });
      if (err) {
        res.status(401).json({ err });
      }
    });
  } else {
    res.status(400).json({ error: "Method not allowed!" });
  }
}

export default connectDB(handler);
