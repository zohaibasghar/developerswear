import connectDB from "@/middleware/db";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
const nodemailer = require("nodemailer");
async function handler(req, res) {
  if (req.method === "POST") {
    let email = req.body.email;
    console.log(req.body);
    let user = await User.findOne({ email }, { password: 0 });
    console.log(user);
    if (user) {
      var rand = function () {
        return Math.floor(Math.random() * 10);
      };

      var token = function () {
        return `${rand()}${rand()}${rand()}${rand()}${rand()}${rand()}`; // to make it longer
      };
      const tokenGen = token();

      // res.status(200).json(forgot);

      async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          service: "gmail",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "meharzohaib123456@gmail.com", // generated ethereal user
            pass: "rnobypsfgwudchgr", // generated ethereal password
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: "cs@developerwear.com", // sender address
          to: user.email, // list of receivers
          subject: "Hello!", // Subject line

          html: `<h1>Developer Wear</h1>
          <p> Dear ${user.name}! You have requested to reset your password Kindly enter the below code on the website to reset your password:</p>
          <br>
          <br>
          <h2>${tokenGen}</h2>
          <br><br>
          <p>If any error occur please contact our customer support service.</p>
          <h4>Password Reset Service</h4>
          <h5>Developer Wear</h5>`, 
        });
        console.log(info.text);

        console.log("Message sent: %s", info.messageId);
        let forgot = await Forgot({
          email,
          token: tokenGen,
        })
          .save()
          .catch((err) =>
            res.status(400).json({
              success: false,
              msg: "Email already sent to your email!",
            })
          );
        console.log(forgot);
        res.status(200).json({
          success: true,
          msg: "Check your email inbox for OTP(One time password).",
        });
        return;
      }

      main().catch((err) => {
        // res.status(401).json({
        //   success: false,
        //   msg: "There is an error in sending the email!",
        //   error:err
        // });
        throw err;
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "Account with this email doesn't exist!",
      });
      return;
    }
  }
}

export default connectDB(handler);
