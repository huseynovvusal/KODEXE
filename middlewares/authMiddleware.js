import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

class AuthMiddleware {
  static async authenticateToken(req, res, next) {
    try {
      const token = await req.cookies.jwt;

      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
          if (err) {
            console.log(err);
            res.redirect("/login");
          } else {
            next();
          }
        });
      } else {
        // TOKEN EXPIRED. LOGIN
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/login");
    }
  }

  static async checkUser(req, res, next) {
    try {
      const token = req.cookies.jwt;

      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
          if (error) {
            console.log(error);
            res.locals.user = null;
          } else {
            // console.log(decoded);
            const user = await User.findById(decoded.userId);

            res.locals.user = user;

            // console.log(res.locals.user);

            next();
          }
        });
      } else {
        res.locals.user = null;
        next();
      }
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
    }
  }

  static async blockLoggedInUser(req, res, next) {
    try {
      const token = req.cookies.jwt;

      if (!token) {
        next();
      } else {
        res.redirect("/");
      }
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
    }
  }
}

export default AuthMiddleware;
