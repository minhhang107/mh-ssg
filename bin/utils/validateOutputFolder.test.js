const validate = require("./validateOutputFolder");

jest.mock("fs");
const fs = require("fs");

describe("validate output folder", () => {
  test("dist folder should return true", async () => {
    const path = "dist";
    expect(validate(path)).toBe(true);
  });

  test("should remove dist folder", async () => {
    const path = "dist";
    fs.existsSync.mockReturnValue(true);
    validate(path);
    expect(fs.rmdirSync).toHaveBeenCalled();
  });

  test("should create new dist folder", async () => {
    const path = "dist";
    fs.existsSync.mockReturnValue(true);
    validate(path);
    expect(fs.mkdirSync).toHaveBeenCalled();
  });

  test("folder other than dist that exists should return true", async () => {
    const path = "sample";
    fs.existsSync.mockReturnValue(true);
    expect(validate(path)).toBe(true);
  });

  test("folder other than dist that does not exist should return false ", async () => {
    const path = "other";
    fs.existsSync.mockReturnValue(false);
    expect(validate(path)).toBe(false);
  });
});
