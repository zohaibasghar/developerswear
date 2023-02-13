import Product from "@/models/Product";
export default async function handler(req, res) {
  if (req.method === "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({ ...req.body[i] });
      await p.save();
    }
    res.status(200).json("products saved");
  } else {
    res.status(400).json("This method is not valid");
  }
}
