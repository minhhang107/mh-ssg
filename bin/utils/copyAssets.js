const fs = require("fs-extra");

const copyAssets = (outputFolder, assetsInputFolder) => {
  const assetsFolder = `${outputFolder}/assets`;

  //create assets folder
  fs.mkdirSync(assetsFolder, { recursive: true });

  //copy static file into assets folder
  try {
    fs.copySync(assetsInputFolder, assetsFolder);
  } catch (err) {
    console.log(err);
  }
};

module.exports = copyAssets;
