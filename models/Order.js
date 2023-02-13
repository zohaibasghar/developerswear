import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    amount: { type: String, required: true, default: "Pending" },
  },
  { timestamps: true,strict:false }
);

export default mongoose.model("Order", orderSchema);
