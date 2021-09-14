const fs = require("fs");
const path = require("path");

//handle output folder
const getOutputName = (data) => {
  if (!data || data.length === 0) {
    output = "dist";
    try {
      if (fs.existsSync(output)) {
        fs.rmdirSync(output, { recursive: true, force: true });
      }
      fs.mkdirSync(output);
    } catch (err) {
      console.error(err);
    }
    return output;
  } else {
    output = data.join(" ");
    fs.lstat(output, (err, stats) => {
      if (err || !stats.isDirectory())
        return console.log(
          "Output folder does not exist. Please use a different folder."
        );
      return output;
    });
  }
};

module.exports = getOutputName;
