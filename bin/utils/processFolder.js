const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const processFile = require("./processFile");

const readdir = (dir) => {
  try {
    var files = fs.readdirSync(dir);
  } catch (err) {
    console.log(err);
    return process.exit(1);
  }

  files = files.filter(
    (file) => path.extname(file) === ".txt" || path.extname(file) === ".md"
  );
  return files;
};

const processFolder = (input, output, stylesheet) => {
  const files = readdir(input);
  files
    .map((file) => {
      return path.join(input, file);
    })
    .forEach((file) => {
      processFile(file, output, stylesheet);
    });

  console.log(
    chalk.green(
      `${files.length} file(s) saved to folder ${output} successfully!`
    )
  );
};

module.exports.processFolder = processFolder;
module.exports.readdir = readdir;
