import { c, cpp, node, python, java } from "compile-run";

async function test_case(timeout, language, code, input = null) {
  let options = {
    timeout: timeout,
  };

  // IF INPUT
  if (input) {
    options.stdin = input;
  }

  let result = null;

  // PYTHON

  if (language == "python") {
    result = await python.runSource(code, options);
  }

  // C

  if (language == "c") {
    result = await c.runSource(code, options);
  }

  // C++

  if (language == "cpp") {
    result = await cpp.runSource(code, options);
  }

  // JAVA

  // if (language == "java") {
  //   result = await java.runSource(code, options);
  // }

  return result;
}

export default test_case;
