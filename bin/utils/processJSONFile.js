const chalk = require("chalk");
const { readFile } = require("jsonfile");
const processInput = require("./processInput");

const processJSONFile = (jsonFile) => {
  readFile(jsonFile, (err, data) => {
    if (err) {
      console.error(chalk.red("Unable to read config file."));
      return process.exit(1);
    }

    const output = !data.output || data.output === "" ? "dist" : data.output;
    const stylesheet = !data.stylesheet ? "" : data.stylesheet;

    processInput(data.input, output, stylesheet);
  });
};

module.exports = processJSONFile;
