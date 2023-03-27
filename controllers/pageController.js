import Problem from "../models/problemModel.js";

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
      const problem = await Problem.findById(req.params.id);

      res.render("problem", { link: "problem", problem: problem });
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
}

export default PageController;
