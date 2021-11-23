const run = require("./run");

describe("end-to-end integration", () => {
  test("print help message when no arg ", async () => {
    const { stderr, exitCode } = await run();
    expect(exitCode).toBe(0);
    expect(stderr).toMatchSnapshot();
  });

  test("print help message when --help flag used", async () => {
    const { stderr, stdout, exitCode } = await run("--help");
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("print version when --version flag used", async () => {
    const { stderr, stdout, exitCode } = await run("--version");
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("print error message when no input", async () => {
    const { stderr, exitCode } = await run("--input");
    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
  });

  test("print error message when input not found", async () => {
    const { stderr, exitCode } = await run("--input", "notfound.txt");
    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
  });

  test("print error message when input not supported", async () => {
    const { stderr, exitCode } = await run("--input", "sample.doc");
    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
  });
});
