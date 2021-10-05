#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const chalk = require("chalk");
const { name, version } = require("../package.json");
const processFile = require("./utils/processFile");
const processFolder = require("./utils/processFolder");
const processJSONFile = require("./utils/processJSONFile");
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
  .option("config", {
    alias: "c",
    describe: "Specify config file",
    type: "array",
  })
  .alias("help", "h")
  .version(`You're running ${name} version ${version}`)
  .alias("version", "v").argv;

// main program
console.log(
  chalk.yellow("-----------------------------------------------------------")
);
console.log(
  chalk.yellow("|                     Welcome to MH-SSG                   |")
);
console.log(
  chalk.yellow("-----------------------------------------------------------\n")
);
yargs.showHelp();
console.log("");

if (argv.config) {
  const configPath = argv.config.join(" ");
  processJSONFile(configPath);
  return;
}

if (!argv.input) {
  if (argv.output)
    return console.error(
      chalk.red(
        "Input file cannot be blank. Please specify an input file or folder."
      )
    );
  return;
}

const input = argv.input.join(" ");
const output =
  !argv.output || argv.output == "" ? "dist" : argv.output.join(" ");
const stylesheet = !argv.stylesheet ? "" : argv.stylesheet;

if (input === "") {
  console.error(
    chalk.red(
      "Input file cannot be blank. Please specify an input file or folder."
    )
  );
  return process.exit(1);
}

fs.lstat(input, (err, stats) => {
  if (err) {
    console.error(
      chalk.red("Input file does not exist. Please use a different file.")
    );
    return process.exit(1);
  }

  //process output folder before converting
  if (!validateOutputFolder(output)) {
    console.error(
      chalk.red(
        "Output folder does not exist. Please specify a different output folder."
      )
    );
    return process.exit(1);
  }

  //handle text file input
  if (stats.isFile()) {
    if (path.extname(input) !== ".txt" && path.extname(input) !== ".md") {
      console.error(
        chalk.red(
          "File type not supported. Please use a text file or markdown file (.txt or .md) only."
        )
      );
      return process.exit(1);
    }
    processFile(input, output, stylesheet);
    console.log(chalk.green(`File saved to folder ${output} successfully!`));
  }

  //handle folder input
  if (stats.isDirectory()) {
    processFolder(input, output, stylesheet);
  }
});
