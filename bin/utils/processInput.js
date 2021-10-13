const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const processFile = require("./processFile");
const processFolder = require("./processFolder");
const validateOutputFolder = require("./validateOutputFolder");

const processInput = (input, output, stylesheet) => {
  output = !output || output == "" ? "dist" : output;

  fs.lstat(input, (err, stats) => {
    if (err) {
      console.error(
        chalk.red("Input file does not exist. Please use a different file.")
      );
      return process.exit(1);
    }

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
      if (path.extname(input) !== ".txt" && path.extname(input) !== ".md") {
        console.error(
          chalk.red(
            "File type not supported. Please use a text file or markdown file (.txt or .md) only."
          )
        );
        return process.exit(1);
      }
      processFile(input, output, stylesheet);
      console.log(chalk.green(`File saved to folder ${output} successfully!`));
    }

    //handle folder input
    if (stats.isDirectory()) {
      processFolder(input, output, stylesheet);
    }
  });
};

module.exports = processInput;
