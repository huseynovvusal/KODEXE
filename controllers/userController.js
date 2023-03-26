import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async sendEmail(link) {
    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "İstifadəçi Doğrulama",
      html: `<h1>${link}</h1>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent");
      }
    });
  }

  async createUser(req, res) {
    try {
      const user = await User.create({ ...req.body });

      console.log(user);

      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      let same = false;

      if (user) {
        same = await bcrypt.compare(password, user.password);

        if (same) {
          const token = UserController.createToken(user._id);

          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          });

          res.json({
            success: true,
          });
        } else {
          console.log("Yalnış şifrə");

          res.json({
            success: false,
            error: "Yalnış şifrə",
          });
        }
      } else {
        console.log("Belə bir istifadəçi yoxdur");
        res.json({
          success: false,
          error: "Belə bir istifadəçi yoxdur",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        error: error,
      });
    }
  }

  static createToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }
}

export default UserController;
