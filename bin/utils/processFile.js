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
      const title = data.split(/\r?\n\r?\n\r?\n/)[0];
      const content =
        `<h1>${title}</h1>\n\n` +
        data
          .slice(title.length + 3)
          .split(/\r?\n\r?\n/)
          .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>`)
          .join("\n\n ");

      const html = createHtml({
        title: title,
        css: stylesheet,
        lang: "en",
        head: `<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1" />`,
        body: content,
      });

      fs.writeFile(outputFilePath, html, (err) => {
        if (err) return console.log(err);
      });
    }
  });
};

module.exports = processFile;
