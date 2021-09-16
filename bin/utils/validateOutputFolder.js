const fs = require("fs");

const validateOutputFolder = (folder) => {
  if (folder === "dist") {
    if (fs.existsSync(folder)) {
      fs.rmdirSync(folder, { recursive: true, force: true });
    }
    fs.mkdirSync(folder);
    return true;
  }

  try {
    if (fs.existsSync(folder)) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = validateOutputFolder;
