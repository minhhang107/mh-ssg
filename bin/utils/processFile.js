const fs = require("fs");
const path = require("path");
const createHtml = require("create-html");

//Convert text file into html file, return html content
const processFile = (inputFile, output, stylesheet) => {
  const inputFilePath = path.join(path.resolve(), inputFile);
  const outputFilePath = path.join(
    output,
    path.basename(inputFile, ".txt") + ".html"
  );

  fs.readFile(inputFilePath, "utf-8", (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      const doubleNewLines = data.match(/^.+(\r?\n\r?\n)\r?\n/);
      const title = doubleNewLines ? doubleNewLines[0] : "";

      const content =
        `<h1>${title.trim()}</h1>\n\n` +
        data
          .slice(title.length)
          .split(/\r?\n\r?\n/)
          .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>`)
          .join("\n\n");

      const html = createHtml({
        title: title != "" ? title.trim() : path.basename(inputFile, ".txt"),
        css: stylesheet,
        lang: "en",
        head: `<meta name="viewport" content="width=device-width, initial-scale=1"/>`,
        body: content,
      });

      fs.writeFile(outputFilePath, html, (err) => {
        if (err) return console.log(err);
      });
    }
  });
};

module.exports = processFile;
