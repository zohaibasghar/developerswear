import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDB from "@/middleware/db";
import pincodes from "@/pincodes.json";
async function handler(req, res) {
  try {
    if (req.method == "POST") {
      let sum = 0,
        product;
      let cart = req.body.cart;
      // todo: check for if the cart is tempered or not [done]
      for (let item in cart) {
        product = await Product.findOne({ slug: item });
        sum += cart[item].price * cart[item].qty;

        // todo: check if the stock available or not [done]

        if (product.availableQty < cart[item].qty) {
          res.status(401).json({
            success: false,
            error: "Some items in your cart are out of stock. Sorry!",
          });
          return;
        }

        if (product.price != cart[item].price) {
          res.status(401).json({
            success: false,
            error:
              "The price of some items in your cart has been changed. Please try Again!",
          });
          return;
        }
      }
      
      if (!Object.keys(pincodes).includes(req.body.checkOutCred.pinCode)) {
        res
          .status(501)
          .json({
            success: "serviceArea",
            error:
              "Sorry! Your area is not serviceable yet. stay tuned for updates.",
          });
        return;
      }
      //todo: check if the total bill is tempered or not [ done ]
      if (sum !== req.body.subTotal) {
        res.status(401).json({
          success: false,
          error: "There is some error in your cart. Please shop again.",
        });
        return;
      }
      const order = await new Order({
        email: req.body.checkOutCred.email,
        orderId: req.body.checkOutCred.orderId,
        products: req.body.cart,
        address: req.body.checkOutCred.address,
        paymentInfo: req.body.checkOutCred.paymentInfo,
        amount: req.body.subTotal,
        status: req.body.checkOutCred.paymentInfo ? "Paid" : "Pending",
      });
      await order.save();
      res.status(200).json({ success: true, orderId: order.orderId });
    } else {
      res.status(400).json({ error: "Request method is not permitted!" });
    }
  } catch (error) {
    res.status(401).json(error);
  }
}
export default connectDB(handler);
