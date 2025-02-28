const esbuild = require("esbuild");
const process = require("node:process");

const esbuildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  outdir: "build",
  platform: "node",
  format: "cjs",
};

function main() {
  const NODE_ENV = process.env.NODE_ENV || "development";

  if (NODE_ENV === "development") {
    return development();
  }
}

async function development() {
  const context = await esbuild.context(esbuildOptions);
  console.log("starting build watch");
  await context.watch();
}

main();
