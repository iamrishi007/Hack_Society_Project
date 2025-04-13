const { exec } = require("child_process");
const fs = require("fs");
const Problem = require("../models/question.model")

const runCode = async (req, res) => {
  const { code, language, problemId } = req.body;

  try {

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ status: "Failed", error: "Problem not found" });
    }

    const testCases = problem.testCases;

    let command;


    if (language === "javascript") {
      fs.writeFileSync("user_code.js", code);
      command = "node user_code.js";
    } else if (language === "python") {
      fs.writeFileSync("user_code.py", code);
      command = "python3 user_code.py";
    } else if (language === "java") {
      fs.writeFileSync("UserCode.java", code);
      command = "javac UserCode.java && java UserCode";
    } else if (language === "cpp") {
      fs.writeFileSync("UserCode.cpp", code);
      command = "g++ UserCode.cpp -o UserCode && ./UserCode";
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(400).json({ status: "Failed", error: stderr });
      }

      let output = stdout.trim();

      let passedAll = true;

     
      for (const test of testCases) {
        const userOutput = output; 

        
        if (userOutput !== test.expectedOutput) {
          passedAll = false;
          break;
        }
      }

      if (passedAll) {
        return res.json({ status: "Accepted" });
      } else {
        return res.json({ status: "Failed", error: "Code failed on one or more test cases" });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: "Failed", error: err.message });
  }
};

module.exports = { runCode };
