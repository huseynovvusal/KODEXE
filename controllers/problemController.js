import Problem from "../models/problemModel.js";
import test_case from "./testCase.js";

class ProblemController {
  async createProblem(req, res) {
    try {
      const problem = Problem.create({ ...req.body });

      // console.log(problem);
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
    }
  }

  static async problemSolution(req, res) {
    try {
      const problemId = req.params.id;
      const { language, code } = req.body;

      const problem = await Problem.findById(problemId);

      const testcases = problem.testcases;

      const result = await ProblemController.checkCode(
        testcases,
        language,
        code
      );

      console.log("RESULT ->", result);

      //
    } catch (error) {
      res.json({
        success: false,
        error: error,
      });
    }
  }

  static async checkCode(testcases, language, code) {
    let passed = 0;

    try {
      for (let testcase of testcases) {
        let input = testcase.input == "" ? null : testcase.input;

        let test = await test_case(1000, language, code, input);

        // console.log(test);

        // TRUE
        if (test.stdout.trimEnd() == testcase.output.trimEnd()) {
          passed += 1;
        }
        // ERROR
        else if ("errorType" in test) {
          return { success: false, error: test.errorType };
        }
        // WRONG
        else {
          return {
            success: false,
            error: "Yalnış cavab",
            passed: passed,
          };
        }
      }

      return { success: true, passed: passed };
    } catch (error) {
      return {
        success: false,
        error: "Server xətası",
        passed: passed,
      };
    }
  }
}

export default ProblemController;
