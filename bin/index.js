#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const { name, version } = require("../package.json");
const getOutputName = require("./utils/getOutputName");
const processFile = require("./utils/processFile");

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
  .version(`You're running ${name} version ${version}`)
  .alias("version", "v").argv;

// main program
console.log("-----------------------------------------------------------");
console.log("|                     Welcome to MH-SSG                   |");
console.log("-----------------------------------------------------------\n");
yargs.showHelp();
console.log("");

if (!argv.input) {
  if (argv.output) {
    return console.log(
      "Input file cannot be blank. Please specify an input file or folder."
    );
  }
  return;
}

const input = argv.input.join(" ");
const stylesheet = argv.stylesheet;

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
    const output = getOutputName(argv.output);
    processFile(input, output, stylesheet);
    console.log(`File saved to folder ${output} successfully!`);
  }

  //handle folder input
  if (stats.isDirectory()) {
    fs.readdir(input, (err, files) => {
      if (err) return console.log(err);

      const output = getOutputName(argv.output);
      const txtFiles = files.filter((file) => path.extname(file) === ".txt");
      txtFiles
        .map((file) => {
          return path.join(input, file);
        })
        .forEach((file) => {
          processFile(file, output, stylesheet);
        });

      console.log(
        `${txtFiles.length} file(s) saved to folder ${output} successfully!`
      );
    });
  }
});
