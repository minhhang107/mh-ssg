const fs = require("fs");

//return
const validateOutputFolder = (folder) => {
  try {
    if (fs.existsSync(folder)) {
      if (folder === "dist") {
        fs.rmdirSync(folder, { recursive: true, force: true });
        fs.mkdirSync(folder);
      }
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = validateOutputFolder;
