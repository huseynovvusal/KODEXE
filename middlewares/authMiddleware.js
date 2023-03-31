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
            res.locals.user = null;
            res.redirect("/login");
          } else {
            next();
          }
        });
      } else {
        // TOKEN EXPIRED. LOGIN
        res.locals.user = null;

        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
      res.locals.user = null;

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
            const user = await User.findById(decoded.userId);

            if (user) {
              res.locals.user = user;
            } else {
              res.locals.user = null;
              res.clearCookie("jwt");
            }

            next();
          }
        });
      } else {
        res.locals.user = null;
        res.clearCookie("jwt");
        next();
      }
    } catch (error) {
      res.locals.user = null;
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
        res.locals.user = null;

        next();
      } else {
        res.redirect("/");
      }
    } catch (error) {
      res.locals.user = null;
      res.json({
        success: false,
        error: error,
      });
    }
  }

  static async blockNotLoggedInUser(req, res, next) {
    try {
      const token = req.cookies.jwt;

      if (token) {
        next();
      } else {
        res.locals.user = null;
        res.redirect("/");
      }
    } catch (error) {
      res.locals.user = null;
      res.json({
        success: false,
        error: error,
      });
    }
  }

  static async checkAdmin(req, res, next) {
    try {
      const token = req.cookies.jwt;

      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
            console.log(err);
            res.redirect("/");
          } else {
            const user = await User.findById(decoded.userId);

            if (user.type == "Admin") {
              // req.flash("success", "Xoş gəldin Admin!");
              next();
            } else {
              res.redirect("/");
            }
          }
        });
      } else {
        res.redirect("/");
      }
    } catch (error) {
      res.redirect("/");
      console.log(error);
    }
  }
}

export default AuthMiddleware;
