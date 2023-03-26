import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

class UserController {
  static async sendEmail(email, link) {
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
      html: `
      <!DOCTYPE html>
      <html lang="az">
        <head>
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
      
            body {
              font-family: "Poppins", sans-serif;
            }
      
            h1 {
              color: #03071e;
            }
      
            p {
              color: #03071e;
              padding-bottom: 0.75rem;
            }
      
          </style>
        </head>
        <body>
          <h1>KODEXE Doğrulama</h1>
          <p>
            Az öncə saytımızda qeydiyyatdan keçdiniz. Hesabınızı doğrulamaq üçün
            aşağıdakı linkə keçid edin.
          </p>
          <a href="${link}">Bura keçid edin</a>
        </body>
      </html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Göndərildi");
      }
    });
  }

  static async verification(email, token, host) {
    try {
      const link = `http://${host}/verification/${token}`;

      UserController.sendEmail(email, link);
    } catch (error) {
      console.log(error);
    }
  }

  async verificate(req, res) {
    const token = req.params.token;

    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        res.json({
          success: false,
          error: error,
        });
      } else {
        try {
          const user = await User.create(decoded);

          console.log("Emailiniz doğrulandı. Sayta giriş edə bilərsiniz");

          res.redirect("/login");
        } catch (error) {
          console.log(error);

          res.redirect("/signup");
        }
      }
    });
  }

  async signUpUser(req, res) {
    try {
      const token = UserController.createToken({ ...req.body }, "10m");

      UserController.verification(req.body.email, token, req.headers.host);

      res.redirect("/login");
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
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
          const token = UserController.createToken({ userId: user._id }, "7d");

          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          });

          res.json({
            success: true,
          });
        } else {
          res.json({
            success: false,
            error: "Yalnış şifrə",
          });
        }
      } else {
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

  static createToken(data, expire) {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: expire,
    });
  }
}

export default UserController;
