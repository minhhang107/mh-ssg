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

    const txtFiles = files.filter((file) => path.extname(file) === ".txt");
    txtFiles
      .map((file) => {
        return path.join(input, file);
      })
      .forEach((file) => {
        processFile(file, output, stylesheet);
      });

    const mdFiles = files.filter((file) => path.extname(file) === ".md");
    mdFiles
      .map((file) => {
        return path.join(input, file);
      })
      .forEach((file) => {
        processFile(file, output, stylesheet);
      });

    console.log(
      chalk.green(
        `${
          txtFiles.length + mdFiles.length
        } file(s) saved to folder ${output} successfully!`
      )
    );
  });
};

module.exports = processFolder;
