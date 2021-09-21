const fs = require("fs");

const validateOutputFolder = (folder) => {
  if (!fs.existsSync(folder) && folder !== "dist") {
    return false;
  }

  if (folder === "dist") {
    fs.rmdirSync(folder, { recursive: true, force: true });
    fs.mkdirSync(folder);
  }
  return true;
};

module.exports = validateOutputFolder;
