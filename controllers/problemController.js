import Problem from "../models/problemModel.js";
import test_case from "./testCase.js";

class ProblemController {
  static async problemSolution(req, res) {
    try {
      const problemName = req.params.name;
      const { language, code } = req.body;

      const problem = await Problem.findOne({ url_name: problemName });

      const testcases = problem.testcases;

      const result = await ProblemController.checkCode(
        testcases,
        language,
        code
      );

      res.send(result);
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
        const test = await test_case(1000, language, code, testcase.input);

        // console.log(test);

        if (test.output.trimEnd() == testcase.output.trimEnd()) {
          passed += 1;
        } else if (test.statusCode == 200) {
          return {
            success: false,
            error: "Yalnış cavab",
            passed: passed,
          };
        } else {
          return {
            success: false,
            error: test.output,
            passed: passed,
          };
        }
      }

      return { success: true, passed: passed };
    } catch (error) {
      return {
        success: false,
        error: "Gözlənilməz xəta. Yenidən cəhd edin.",
        passed: passed,
      };
    }
  }
}

export default ProblemController;
