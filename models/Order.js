import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    amount: { type: String, required: true, default: "Pending" },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true, strict: false }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
