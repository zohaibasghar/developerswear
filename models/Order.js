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

const Order = mongoose.models.Order|| mongoose.model("Order", orderSchema);
export default Order;
