#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const { name, version } = require("../package.json");
const processFile = require("./utils/processFile");
const processFolder = require("./utils/processFolder");
const validateOutputFolder = require("./utils/validateOutputFolder");

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

const input = !argv.input ? "" : argv.input.join(" ");
const output =
  !argv.output || argv.output == "" ? "dist" : argv.output.join(" ");
const stylesheet = !argv.stylesheet ? "" : argv.stylesheet;

if (input === "") {
  return console.error(
    "Input file cannot be blank. Please specify an input file or folder."
  );
}

fs.lstat(input, (err, stats) => {
  if (err)
    return console.error(
      "Input file does not exist. Please use a different file."
    );

  //process output folder before converting
  if (!validateOutputFolder(output))
    return console.error(
      "Output folder does not exist. Please specify a different output folder."
    );

  //handle text file input
  if (stats.isFile()) {
    if (path.extname(input) !== ".txt") {
      return console.error(
        "File type not supported. Please use a text file (.txt) only."
      );
    }
    processFile(input, output, stylesheet);
    console.log(`File saved to folder ${output} successfully!`);
  }

  //handle folder input
  if (stats.isDirectory()) {
    processFolder(input, output, stylesheet);
  }
});
