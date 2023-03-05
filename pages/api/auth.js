import connectDB from "@/middleware/db";
const jwt = require("jsonwebtoken");
async function handler(req, res) {
  if (req.method === "POST") {
    jwt.verify(req.body.token, "key", function (err, decoded) {
      if (err) {
        res.status(400).json({ error: "Error in the token!" });
        return;
      }
      res.status(200).json({ name: decoded.name, email: decoded.email });
    });
  } else {
    res.status(400).json({ error: "Method not allowed!" });
  }
}

export default connectDB(handler);
