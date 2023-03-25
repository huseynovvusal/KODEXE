class PageController {
  static getIndexPage(req, res) {
    res.render("index", { link: "home" });
  }
  static getProblemsetPage(req, res) {
    res.render("problemset", { link: "problemset" });
  }
  static getLoginPage(req, res) {
    res.render("login", { link: "login" });
  }
  static getSignupPage(req, res) {
    res.render("signup", { link: "signup" });
  }
}

export default PageController;
