const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const processFile = require("./processFile");

const processFolder = (input, output, stylesheet) => {
  fs.readdir(input, (err, files) => {
    if (err) {
      console.error(chalk.red(`Unable to process file(s) inside ${input}`));
      return process.exit(1);
    }

    const acceptedFiles = files.filter(
      (file) => path.extname(file) === ".txt" || path.extname(file) === ".md"
    );
    acceptedFiles
      .map((file) => {
        return path.join(input, file);
      })
      .forEach((file) => {
        processFile(file, output, stylesheet);
      });

    console.log(
      chalk.green(
        `${acceptedFiles.length} file(s) saved to folder ${output} successfully!`
      )
    );
  });
};

module.exports = processFolder;
