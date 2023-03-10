import connectDB from "@/middleware/db";
import Product from "@/models/Product";
async function handler(req, res) {
  if (req.method === "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({ ...req.body[i] });
      await p.save();
      console.log(p);
    }

    res.status(200).json("products saved");
  } else {
    res.status(400).json("This method is not valid");
  }
}
export default connectDB(handler);
