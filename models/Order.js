import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    email: { type: String, required: true },
    orderId: { type: String, required: true, unique: true },
    paymentInfo: { type: String, default: "COD" },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true, strict: false }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
