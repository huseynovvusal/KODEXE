import ProblemModel from "../models/problemModel.js";

class ProblemController {
  async createProblem(req, res) {
    try {
      const problem = ProblemModel.create({ ...req.body });

      console.log(problem);
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
    }
  }
}

export default ProblemController;
