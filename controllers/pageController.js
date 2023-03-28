import Problem from "../models/problemModel.js";
import User from "../models/userModel.js";

class PageController {
  static getIndexPage(req, res) {
    res.render("index", { link: "home" });
  }
  static async getProblemsetPage(req, res) {
    try {
      const problems = await Problem.find();

      res.render("problemset", { link: "problemset", problems: problems });
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
      });
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
    }
  }
  static getLoginPage(req, res) {
    res.render("login", { link: "login" });
  }
  static getSignupPage(req, res) {
    res.render("signup", { link: "signup" });
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
            solved_problems: solved_problem,
          }
        );

        res.send({ success: true, scored: true });
      }

      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
}

export default PageController;
