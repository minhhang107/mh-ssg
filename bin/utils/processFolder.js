const fs = require("fs");
const path = require("path");
const processFile = require("./processFile");

const processFolder = (input, output, stylesheet) => {
  fs.readdir(input, (err, files) => {
    if (err) return console.log(err);

    const txtFiles = files.filter((file) => path.extname(file) === ".txt");
    txtFiles
      .map((file) => {
        return path.join(input, file);
      })
      .forEach((file) => {
        processFile(file, output, stylesheet);
      });

    console.log(
      `${txtFiles.length} file(s) saved to folder ${output} successfully!`
    );
  });
};

module.exports = processFolder;
