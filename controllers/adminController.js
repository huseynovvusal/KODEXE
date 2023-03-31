import Problem from "../models/problemModel.js";

class AdminController {
  static async add_problem(req, res) {
    try {
      console.log(req.body);

      const problem = await Problem.create({ ...req.body });

      req.flash("success", `${problem.name} adlı məsələ uğurla əlavə olundu`);

      res.send({ success: true });
    } catch (error) {
      req.flash("error", "Gözlənilməz xəta yaranı");
      console.log(error);
      res.send({ success: false });
    }
  }
}

export default AdminController;
