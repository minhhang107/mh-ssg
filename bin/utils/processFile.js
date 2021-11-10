const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { generateHTML } = require("./generateHTML");
const hljs = require("highlight.js");
const markdown = require("markdown-it")({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {
        console.log(__);
      }
    }

    return (
      '<pre class="hljs"><code>' +
      markdown.utils.escapeHtml(str) +
      "</code></pre>"
    );
  },
});

//Convert text file into html file, return html content
const processFile = (inputFile, output, stylesheet) => {
  let assets;
  const inputFilePath = path.join(path.resolve(), inputFile);
  const getOutputFileName = (ext) => {
    return path.join(output, path.basename(inputFile, ext) + ".html");
  };

  fs.readFile(inputFilePath, "utf-8", (err, data) => {
    let outputFilePath;

    if (err) {
      console.error(chalk.red("Unable to read file."));
      return process.exit(1);
    }

    if (path.extname(inputFile) === ".txt") {
      outputFilePath = getOutputFileName(".txt");
    } else {
      outputFilePath = getOutputFileName(".md");
      data = markdown.render(data);
      if (fs.existsSync(`${output}/assets`)) {
        assets = fs.readdirSync(`${output}/assets`);
      }
    }

    data = generateHTML(inputFile, stylesheet, data, assets);

    fs.writeFile(outputFilePath, data, (err) => {
      if (err) {
        console.error(chalk.red("Unable to save file."));
        return process.exit(1);
      }
    });
  });
};

module.exports = processFile;
