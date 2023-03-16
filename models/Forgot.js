import mongoose from "mongoose";
const { Schema } = mongoose;
const forgotSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    token: { type: String },
    createdAt: {
      type: Date,
      expires: "2h",
      index: true,
      default: Date.now,
    },
  },
  { timestamps: true, strict: false }
);

const Forgot = mongoose.models.Forgot || mongoose.model("Forgot", forgotSchema);
export default Forgot;
