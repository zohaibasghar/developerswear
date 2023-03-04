import Order from "@/models/Order";
const jwt = require("jsonwebtoken");
export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = jwt.verify(req.body.token, "key");
    let orders = await Order.find({ email: data.email });
    res.status(200).json({ orders });
  } else {
    res.status(400).send("Method not allowed!");
  }
}
