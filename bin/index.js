#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const { name, version } = require("../package.json");

const argv = yargs
  .scriptName("mh-ssg")
  .usage("Usage: $0 -i <filename> -o <outputpath> -s <stylesheet>")
  .option("input", {
    alias: "i",
    describe: "Specify input file or input folder (required)",
    type: "array",
  })
  .option("output", {
    alias: "o",
    describe: "Specify output path",
    type: "array",
  })
  .option("stylesheet", {
    alias: "s",
    describe: "Specify stylesheet for html file",
    type: "string",
    default: "",
  })
  .alias("help", "h")
  .version(false)
  .option("version", {
    alias: "v",
    describe: "Show program name and version",
    demandOption: false,
  }).argv;

//handle output folder
const getOutputName = (data) => {
  if (!data || data.length === 0) {
    output = "dist";
    try {
      if (fs.existsSync(output)) {
        fs.rmdirSync(output, { recursive: true, force: true });
      }
      fs.mkdirSync(output);
    } catch (err) {
      console.error(err);
    }
    return output;
  } else {
    output = data.join(" ");
    fs.lstat(output, (err, stats) => {
      if (err || !stats.isDirectory())
        return console.log(
          "Output folder does not exist. Please use a different folder."
        );
      return output;
    });
  }
};

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

// main program
console.log("-----------------------------------------------------------");
console.log("|                     Welcome to MH-SSG                   |");
console.log("-----------------------------------------------------------\n");
yargs.showHelp();
console.log("");

if (argv.version) {
  console.log(`You're currently running ${name} - Version ${version}`);
}

if (!argv.input) {
  if (argv.output || argv.stylesheet) {
    return console.log(
      "Input file cannot be blank. Please specify an input file or folder."
    );
  }
  return;
}

const input = argv.input.join(" ");
const stylesheet = argv.stylesheet;
let output = "dist";

if (input === "") {
  return console.error(
    "Input file cannot be blank. Please specify an input file or folder."
  );
}

fs.lstat(input, (err, stats) => {
  if (err)
    return console.log(
      "Input file does not exist. Please use a different file."
    );

  //handle text file input
  if (stats.isFile()) {
    if (path.extname(input) !== ".txt") {
      return console.error(
        "File type not supported. Please use a text file (.txt) only."
      );
    }
    const output = getOutputPath(argv.output);
    processFile(input, output, stylesheet);
    console.log(`File saved to folder ${output} successfully!`);
  }

  //handle folder input
  if (stats.isDirectory()) {
    fs.readdir(input, (err, files) => {
      if (err) return console.log(err);

      const output = getOutputName(argv.output);
      files
        .filter((file) => path.extname(file) === ".txt")
        .map((file) => {
          return path.join(input, file);
        })
        .forEach((file) => {
          processFile(file, output, stylesheet);
        });

      console.log(
        `${files.length} file(s) saved to folder ${output} successfully!`
      );
    });
  }
});
