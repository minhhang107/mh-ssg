const { readdir, processFolder } = require("./processFolder");
const chalk = require("chalk");

jest.mock("fs");

describe("readdir", () => {
  const MOCK_FILE_INFO = {
    "/path/text.txt": "Hello World!",
    "/path/markdown.md": "This is a markdown file",
    "/path/image.jpg": "This is an image",
  };

  beforeEach(() => {
    require("fs").__setMockFiles(MOCK_FILE_INFO);
  });

  test("should only return txt and md files", () => {
    const files = readdir("/path");
    expect(files).toEqual(["text.txt", "markdown.md"]);
  });
});

describe("processFolder", () => {
  const MOCK_FILE_INFO = {
    "/path/text.txt": "Hello World!",
    "/path/markdown.md": "This is a markdown file",
    "/output": []
  };

  beforeEach(() => {
    require("fs").__setMockFiles(MOCK_FILE_INFO);
  });

  test("should log success message to console", () => {
    const mockSpy = jest.spyOn(console, 'log');
    processFolder("/path", "/output", "https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css");
    expect(mockSpy).toHaveBeenCalledWith(`${chalk.green(
      `2 file(s) saved to folder /output successfully!`
    )}`);
  });

  test("should log success message to console", () => {
    const mockSpy = jest.spyOn(console, 'log');
    processFolder("/nonexistent", "/output", "https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css");
    expect(mockSpy).toHaveBeenCalledWith(`${chalk.green(
      `0 file(s) saved to folder /output successfully!`
    )}`);
  });
});
