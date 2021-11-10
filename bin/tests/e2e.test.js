const run = require("./run");

const welcomeMessage = `-----------------------------------------------------------
|                     Welcome to MH-SSG                   |
-----------------------------------------------------------\n\n`;

describe("end-to-end integration", () => {
  test("print help message when no arg ", async () => {
    const { stderr, stdout, exitCode } = await run();
    expect(exitCode).toBe(0);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(welcomeMessage);
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
    const { stderr, stdout, exitCode } = await run("--input");
    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(welcomeMessage);
  });

  test("print error message when input not found", async () => {
    const { stderr, stdout, exitCode } = await run("--input", "notfound.txt");
    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(welcomeMessage);
  });

  test("print error message when input not supported", async () => {
    const { stderr, stdout, exitCode } = await run("--input", "sample.doc");
    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(welcomeMessage);
  });

  // test('print error message when empty folder', async () => {
  //     const { stderr, stdout, exitCode } = await run(
  //         '--input',
  //         'invalid-folder'
  //     );
  //     expect(exitCode).toBe(1);
  //     expect(stderr).toMatchSnapshot();
  //     expect(stdout).toEqual('');
  // });

  // test('Generates HTML file when valid file path', async () => {
  //     const { stderr, stdout, exitCode } = await run(
  //         '--input',
  //         'test-docs/Silver Blaze.txt'
  //     );
  //     expect(exitCode).toBe(0);
  //     expect(stdout).toMatchSnapshot();
  //     expect(stderr).toEqual('');
  // });

  // test('Generates HTML files when valid folder path', async () => {
  //     const { stderr, stdout, exitCode } = await run('--input', 'test-docs');
  //     expect(exitCode).toBe(0);
  //     expect(stdout).toMatchSnapshot();
  //     expect(stderr).toEqual('');
  // });

  // test('Generates HTML files when valid file and output paths', async () => {
  //     const { stderr, stdout, exitCode } = await run(
  //         '--input',
  //         'test-docs',
  //         '--output',
  //         'empty-folder'
  //     );
  //     expect(exitCode).toBe(0);
  //     expect(stdout).toMatchSnapshot();
  //     expect(stderr).toEqual('');
  // });
});
