import connectDB from "@/middleware/db";
import Product from "@/models/Product";


async function handler(req, res) {
    if(req.method==="POST"){
        let product = await Product.findOne({slug:req.body.slug,color:req.body.color})
        res.status(200).json({img:product.img,color:product.color})
    }
    else{
        res.status(500).json({error:"Method not allowed!"})
    }
}

export default connectDB(handler)