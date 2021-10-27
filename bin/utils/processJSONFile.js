const chalk = require("chalk");
const { readFile } = require("jsonfile");
const processInput = require("./processInput");

const processJSONFile = (jsonFile) => {
  readFile(jsonFile, (err, data) => {
    if (err) {
      console.error(chalk.red("Unable to read config file."));
      return process.exit(1);
    }

    processInput(data.input, data.output, data.stylesheet, data.assets);
  });
};

module.exports = processJSONFile;
