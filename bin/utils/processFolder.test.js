const { readdir } = require("./processFolder");

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
