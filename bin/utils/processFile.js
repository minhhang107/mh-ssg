const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
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
      console.error(chalk.red("Unable to read file."));
      return process.exit(1);
    } else {
      let html;

      if (path.extname(inputFile) === ".txt") {
        const doubleNewLines = data.match(/^.+(\r?\n\r?\n)\r?\n/);
        const title = doubleNewLines ? doubleNewLines[0] : "";

        const content =
          `<h1>${title.trim()}</h1>\n\n` +
          data
            .slice(title.length)
            .split(/\r?\n\r?\n/)
            .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>`)
            .join("\n\n");

        html = createHtml({
          title: title != "" ? title.trim() : path.basename(inputFile, ".txt"),
          css: stylesheet,
          lang: "en",
          head: `<meta name="viewport" content="width=device-width, initial-scale=1"/>`,
          body: content,
        });
      } else {
        // .md file
        const h1 = /^# (.*$)/gim;
        const h2 = /^## (.*$)/gim;
        const h3 = /^### (.*$)/gim;
        const h4 = /^#### (.*$)/gim;
        const h5 = /^##### (.*$)/gim;
        const h6 = /^###### (.*$)/gim;
        const bold = /\*\*(.*)\*\*/gim;
        const italics = /\_(.*)\_/gim;
        const link = /\[(.*?)\]\((.*?)\)/gim;
        const content = data
          .replace(h1, "<h1>$1</h1>")
          .replace(h2, "<h2>$1</h2>")
          .replace(h3, "<h3>$1</h3>")
          .replace(h4, "<h4>$1</h4>")
          .replace(h5, "<h5>$1</h5>")
          .replace(h6, "<h6>$1</h6>")
          .replace(bold, "<b>$1</b>")
          .replace(italics, "<i>$1</i>")
          .replace(link, "<a href='$2'>$1</a>");

        html = createHtml({
          css: stylesheet,
          lang: "en",
          head: `<meta name="viewport" content="width=device-width, initial-scale=1"/>`,
          body: content,
        });
      }

      fs.writeFile(outputFilePath, html, (err) => {
        if (err) {
          console.error(chalk.red("Unable to save file."));
          return process.exit(1);
        }
      });
    }
  });
};

module.exports = processFile;
