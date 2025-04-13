const axios = require("axios");

const runCode = async (source_code, language_id, stdin) => {
  const encodedSourceCode = Buffer.from(source_code).toString("base64");
  const encodedStdin = Buffer.from(stdin).toString("base64");

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", wait: "true" },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id,
      source_code: encodedSourceCode,
      stdin: encodedStdin,
    },
  };

  const response = await axios.request(options);
  return response.data;
};

module.exports = runCode;
