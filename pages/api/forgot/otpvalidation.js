import connectDB from "@/middleware/db";
import Forgot from "@/models/Forgot";

async function handler(req, res) {
  if (req.method === "POST") {
    let otpSaved = await Forgot.findOne({ email: req.body.email });

    console.log(otpSaved.token);
    if (otpSaved.token === req.body.otp) {
      res.status(200).json({
        success: true,
        msg: "OTP matched successfully! Now enter your new password.",
      });
    } else {
      res
        .status(401)
        .json({ success: false, msg: "OTP Didn't matched! try again!" });
    }
  } else {
    res.status(500).json({ error: "Method not allowed!" });
  }
}

export default connectDB(handler);
