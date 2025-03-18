const cp = require("child_process");
const fs = require("fs");

const buildInterface = () => {
  console.log("---------------------------------------");
  console.log(" Build Interface");
  console.log("---------------------------------------");

  const location = `${__dirname}/../../interface`;
  const load = () =>
    JSON.parse(fs.readFileSync(`${location}/package.json`, "utf-8"));

  const original = load();
  const packJson = load();
  packJson.main = "./lib/index.js";
  packJson.typings = "./lib/index.d.ts";

  const execute = (command) =>
    cp.execSync(command, {
      cwd: location,
      stdio: "inherit",
    });
  try {
    fs.writeFileSync(
      `${location}/package.json`,
      JSON.stringify(packJson, null, 2),
    );
    execute("pnpm run build");
    execute("pnpm pack");
  } catch (error) {
    throw error;
  } finally {
    fs.writeFileSync(
      `${location}/package.json`,
      JSON.stringify(original, null, 2),
      "utf8",
    );
  }
};

const buildCompiler = () => {
  console.log("---------------------------------------");
  console.log(" Build Compiler");
  console.log("---------------------------------------");

  const location = `${__dirname}/../../compiler`;
  const load = () =>
    JSON.parse(fs.readFileSync(`${location}/package.json`, "utf-8"));

  const original = load();
  const packJson = load();
  packJson.main = "./lib/index.js";
  packJson.typings = "./lib/index.d.ts";
  packJson.dependencies["@autoview/interface"] =
    `file:../interface/autoview-interface-${original.version}.tgz`;

  const execute = (command) =>
    cp.execSync(command, {
      cwd: location,
      stdio: "inherit",
    });
  try {
    fs.writeFileSync(
      `${location}/package.json`,
      JSON.stringify(packJson, null, 2),
    );
    execute("pnpm run build");
    execute("pnpm pack");
  } catch (error) {
    throw error;
  } finally {
    fs.writeFileSync(
      `${location}/package.json`,
      JSON.stringify(original, null, 2),
      "utf8",
    );
  }
};

const buildWorker = () => {
  console.log("---------------------------------------");
  console.log(" Building Worker");
  console.log("---------------------------------------");

  const location = `${__dirname}/..`;
  const load = () =>
    JSON.parse(fs.readFileSync(`${location}/package.json`, "utf-8"));
  const original = load();
  const packJson = load();

  try {
    packJson.dependencies["@autoview/compiler"] =
      `file:../compiler/autoview-compiler-${packJson.version}.tgz`;
    packJson.dependencies["@autoview/interface"] =
      `file:../interface/autoview-interface-${packJson.version}.tgz`;
    fs.writeFileSync(
      `${location}/package.json`,
      JSON.stringify(packJson, null, 2),
      "utf8",
    );

    const execute = (command) =>
      cp.execSync(command, {
        cwd: location,
        stdio: "inherit",
      });
    execute("npm install");
    execute("npx rspack");
  } catch (error) {
    throw error;
  } finally {
    fs.writeFileSync(
      `${location}/package.json`,
      JSON.stringify(original, null, 2),
      "utf8",
    );
  }
};

buildInterface();
buildCompiler();
buildWorker();
