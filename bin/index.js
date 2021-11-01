#!/usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const { name, version } = require("../package.json");
const processInput = require("./utils/processInput");
const processJSONFile = require("./utils/processJSONFile");

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
}

if (argv.input) {
  const output = !argv.output ? "" : argv.output.join(" ");
  const stylesheet = !argv.stylesheet ? "" : argv.stylesheet;
  const input = argv.input.join(" ");

  processInput(input, output, stylesheet);
}
