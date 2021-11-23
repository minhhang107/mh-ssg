const fs = require("fs-extra");

const copyAssets = (outputFolder, assetsInputFolder) => {
  const assetsFolder = `${outputFolder}/assets`;

  //create assets folder
  try {
    fs.mkdirSync(assetsFolder, { recursive: true });
  } catch (err) {
    console.log(err);
    return process.exit(1);
  }

  //copy static file into assets folder
  try {
    fs.copySync(assetsInputFolder, assetsFolder);
  } catch (err) {
    console.log(err);
    return process.exit(1);
  }
};

module.exports = copyAssets;
