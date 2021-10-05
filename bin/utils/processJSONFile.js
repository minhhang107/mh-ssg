const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { readFile } = require("jsonfile");
const processFile = require("./processFile");
const processFolder = require("./processFolder");
const validateOutputFolder = require("./validateOutputFolder");

const processJSONFile = (jsonFile) => {
  readFile(jsonFile, (err, data) => {
    if (err) {
      console.error(chalk.red("Unable to read config file."));
      return process.exit(1);
    }

    if (data.input === "") {
      console.error(
        chalk.red(
          "Input file cannot be blank. Please specify an input file or folder."
        )
      );
      return process.exit(1);
    }

    fs.lstat(data.input, (err, stats) => {
      if (err) {
        console.error(
          chalk.red("Input file does not exist. Please use a different file.")
        );
        return process.exit(1);
      }

      const output = !data.output || data.output === "" ? "dist" : data.output;
      const stylesheet = !data.stylesheet ? "" : data.stylesheet;

      //process output folder before converting
      if (!validateOutputFolder(output)) {
        console.error(
          chalk.red(
            "Output folder does not exist. Please specify a different output folder."
          )
        );
        return process.exit(1);
      }

      //handle text file input
      if (stats.isFile()) {
        if (
          path.extname(data.input) !== ".txt" &&
          path.extname(data.input) !== ".md"
        ) {
          console.error(
            chalk.red(
              "File type not supported. Please use a text file or markdown file (.txt or .md) only."
            )
          );
          return process.exit(1);
        }
        processFile(data.input, output, stylesheet);
        console.log(
          chalk.green(`File saved to folder ${output} successfully!`)
        );
      }

      //handle folder input
      if (stats.isDirectory()) {
        processFolder(data.input, output, stylesheet);
      }
    });
  });
};

module.exports = processJSONFile;
