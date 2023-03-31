import { c, cpp, node, python, java } from "compile-run";
import axios from "axios";

async function test_case(timeout, language, code, input = "") {
  let version = {
    python: "python3",
    cpp: "cpp17",
    c: "c",
    java: "java",
    csharp: "csharp",
  };

  const res = await axios.post("https://api.jdoodle.com/v1/execute", {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    script: code,
    stdin: input,
    language: version[language],
  });

  return res.data;
}

export default test_case;
