const fs = require("fs");
const path = require("path");

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
      const content = data
        .slice(title.length + 1)
        .split(/\r?\n\r?\n/)
        .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>`)
        .join(" ");

      const template = `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="utf-8" />
                            <title>${title}</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <link rel=\"stylesheet\" href=\"${stylesheet}\">
                          </head>
                          <body>
                            <h1>${title}</h1>
                            ${content}
                          </body>
                        </html>
                        `;

      fs.writeFile(outputFilePath, template, (err) => {
        if (err) return console.log(err);
      });
    }
  });
};

module.exports = processFile;
