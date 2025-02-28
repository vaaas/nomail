import { App } from "./App";

async function main() {
  console.log("Starting nomail");
  const app = new App();
  await app.start();
}

main();
