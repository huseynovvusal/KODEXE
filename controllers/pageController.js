import Problem from "../models/problemModel.js";
import User from "../models/userModel.js";

class PageController {
  static getIndexPage(req, res) {
    res.render("index", {
      link: "home",
      flash: {
        success: req.flash("success"),
        error: req.flash("error"),
        info: req.flash("info"),
      },
    });
  }
  static async getProblemsetPage(req, res) {
    try {
      const problems = await Problem.find();

      res.render("problemset", {
        link: "problemset",
        problems: problems,
        flash: {
          success: req.flash("success"),
          error: req.flash("error"),
          info: req.flash("info"),
        },
      });
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
    }
  }
  static async getProblemPage(req, res) {
    try {
      const problem = await Problem.findOne({ url_name: req.params.name });

      res.render("problem", {
        link: "problem",
        problem: problem,
        flash: {
          success: req.flash("success"),
          error: req.flash("error"),
          info: req.flash("info"),
        },
      });
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
    }
  }
  static getLoginPage(req, res) {
    res.render("login", {
      link: "login",
      flash: {
        success: req.flash("success"),
        error: req.flash("error"),
        info: req.flash("info"),
      },
    });
  }
  static getSignupPage(req, res) {
    res.render("signup", {
      link: "signup",
      flash: {
        success: req.flash("success"),
        error: req.flash("error"),
        info: req.flash("info"),
      },
    });
  }

  static async updateUserScore(req, res) {
    try {
      const username = req.params.username;
      const solved_problem = req.body.solved_problem;

      let user = await User.findOne({ username: username });

      // console.log(
      //   user.solved_problems.includes(solved_problem),
      //   user.solved_problems
      // );

      if (user.solved_problems.includes(solved_problem)) {
        res.send({ success: true, scored: false });
      }
      // UPDATE SCORE
      else {
        const problem = await Problem.findOne({ url_name: solved_problem });

        const score = problem.score;

        user = await User.updateOne(
          { username: username },
          {
            score: user.score + score,
            solved_problems: [...user.solved_problems, solved_problem],
          }
        );

        res.send({ success: true, scored: true });
      }

      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async getProfilePage(req, res) {
    try {
      const user = await User.findOne({ username: req.params.username });

      if (user)
        res.render("profile", {
          link: "profile",
          _user: user,
          flash: {
            success: req.flash("success"),
            error: req.flash("error"),
            info: req.flash("info"),
          },
        });
      else res.render("404");
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
    }
  }

  static async getLeaderboardPage(req, res) {
    try {
      const users = await User.find();

      res.render("leaderboard", {
        link: "leaderboard",
        users: users.sort((x) => x.score),
        flash: {
          success: req.flash("success"),
          error: req.flash("error"),
          info: req.flash("info"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getAdminPage(req, res) {
    res.render("admin", {
      link: "admin",
      flash: {
        success: req.flash("success"),
        error: req.flash("error"),
        info: req.flash("info"),
      },
    });
  }
}

export default PageController;
