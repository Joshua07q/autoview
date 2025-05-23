const cp = require("child_process");

const { loadPackages } = require("./internal/loadPackages");

const build = (name) => {
  console.log("=========================================");
  console.log(` Build @autoview/${name}`);
  console.log("=========================================");

  const cwd = `${__dirname}/../packages/${name}`;
  const execute = (command) =>
    cp.execSync(command, {
      cwd,
      stdio: "inherit",
    });

  execute("pnpm run build");
};

const main = () => {
  cp.execSync("pnpm install", {
    cwd: `${__dirname}/../`,
    stdio: "inherit",
  });
  loadPackages().reverse().forEach(build);
};
main();
