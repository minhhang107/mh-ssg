const path = require("path");
const createHtml = require("create-html");

const generateHTML = (inputFile, stylesheet, data, assets) => {
  const doubleNewLines = data.match(/^.+(\r?\n\r?\n)\r?\n/);
  const title = doubleNewLines ? doubleNewLines[0] : "";
  var content =
    `<h1>${title.trim()}</h1>\n\n` +
    data
      .slice(title.length)
      .split(/(\r?\n)+3/)
      .map((para) => `<p>${para.replace(/\r?\n/, " ")}</p>`)
      .join("\n");

  if (assets) {
    const imgRegex = /\<img src="(.*?)"(.*?)\>/gim;
    const imgTags = content.match(imgRegex);
    imgTags.forEach((tag) => {
      assets.forEach((asset) => {
        const src = /src="(.*?)"/gim;
        if (tag.includes(asset)) {
          const updatedTag = tag.replace(src, `src="assets/${asset}"`);
          content = content.replace(tag, updatedTag);
        }
      });
    });
  }

  const html = createHtml({
    title: title != "" ? title.trim() : path.basename(inputFile, ".txt"),
    css: stylesheet,
    lang: "en",
    head: `<meta name="viewport" content="width=device-width, initial-scale=1"/>`,
    body: content,
  });
  return html;
};

module.exports = generateHTML;
