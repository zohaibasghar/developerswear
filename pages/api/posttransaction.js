import Order from "@/models/Order";
import connectDB from "@/middleware/db";
import Product from "@/models/Product";
export default async function handler(req, res) {
  if (req.method === "PUT") {
    let order = await Order.findOne({ orderId: req.body.id });
    let cart = order.products;



    // TODO: decrease the stock from products after successful order
    for (let item in cart) {
      let product = await Product.findOne({ slug: item, size:cart[item].size, color:cart[item].variant });
      console.log(product)
        await Product.findOneAndUpdate(
          { slug: item,size:cart[item].size },
          {
            $inc: {
              availableQty: -cart[item].qty,
            },
          }
        );
    }
    res.status(200).json({ success: true, error: "Stock updated!" });
  } else {
    res.status(400).json({ error: "Method not allowed!" });
  }
}
