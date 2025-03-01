import { App } from "./App";
import { use } from "@nomail/service-locator";
import { XMPPModule } from "@nomail/xmpp";

async function main() {
  console.log("Starting nomail");
  await use(App.provider).register(XMPPModule()).start();
}

main();
