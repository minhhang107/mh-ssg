const { generateContent, generateHTML } = require("./generateHTML");

const inputFile = "sample.txt";
const data = `Silver Blaze


I am afraid, Watson, that I shall have to go,” said Holmes, as we sat down together to our breakfast one morning.

“Go! Where to?”`;

const dataNoTitle = `I am afraid, Watson, that I shall have to go,” said Holmes, as we sat down together to our breakfast one morning.

“Go! Where to?”`;

describe("generate HTML", () => {
  test("should return HTML content with title from data", () => {
    const html = generateHTML(inputFile, "", data, "");
    expect(html.includes(`<title>Silver Blaze</title>`)).toBeTruthy();
  });

  test("should return HTML content with title from sample", () => {
    const html = generateHTML(inputFile, "", dataNoTitle, "");
    expect(html.includes(`<title>sample</title>`)).toBeTruthy();
  });

  test("should return HTML content with stylesheet", () => {
    const stylesheet = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css";
    const html = generateHTML(inputFile, stylesheet, data, "");
    expect(
      html.includes(
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">`
      )
    ).toBeTruthy();
  });
});

describe("generate content", () => {
  test("should return the body of HTML without title", () => {
    const content = generateContent("", dataNoTitle, "");
    const expected = `<h1></h1>

<p>I am afraid, Watson, that I shall have to go,” said Holmes, as we sat down together to our breakfast one morning.</p>
<p></p>
<p>“Go! Where to?”</p>`;
    expect(content).toEqual(expected);
  });

  test("should return the body of HTML with title inside h1 tags", () => {
    const content = generateContent("Silver Blaze", data, "");
    expect(content.includes(`<h1>Silver Blaze</h1>`)).toBeTruthy();
  });

  test("should return the body of HTML with image inside assets folder", () => {
    const data = `I am afraid, Watson, that I shall have to go,” said Holmes, as we sat down together to our breakfast one morning.

“Go! Where to?”

<img src="../something/file.jpg">`;
    const expected = `<h1></h1>

<p>I am afraid, Watson, that I shall have to go,” said Holmes, as we sat down together to our breakfast one morning.</p>
<p></p>
<p>“Go! Where to?”</p>
<p></p>
<p><img src="assets/file.jpg"></p>`;

    const content = generateContent("", data, ["file.jpg"]);
    expect(content).toEqual(expected);
  });
});
