import Order from "@/models/Order";
import connectDB from "@/middleware/db";
async function handler(req, res) {
  // try {
  if (req.method == "POST") {
    const order = await new Order({
      email: req.body.email,
      orderId: req.body.orderId,
      products: req.body.cart,
      address: req.body.address,
      amount: req.body.amount,
    });
    await order.save();
    res.status(200).json({ success: true, orderId: order.orderId });
  } else {
    res.status(400).json({ error: "Request method is not permitted!" });
  }
  // } catch (error) {
  //   res.status(401).json(error);
  // }
}
export default connectDB(handler);
