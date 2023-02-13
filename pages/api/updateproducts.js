import Product from "@/models/Product";
export default async function handler(req, res) {
  if (req.method === "PUT") {
    for (let i = 0; i < req.body.length; i++) {
      let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).json("products saved");
  } else {
    res.status(400).json("This method is not valid");
  }
}
