const execa = require("execa");

async function run(...args) {
  try {
    const result = await execa.node("bin/index.js", args);
    return result;
  } catch (err) {
    return err;
  }
}

module.exports = run;
