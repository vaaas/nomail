import { App } from "./App";
import { XMPPModule } from "./modules/XMPP/XMPPModule";
import { Web } from "./services/Web";
import { use } from "./util/use";

async function main() {
  console.log("Starting nomail");
  const app = use(App.provider);
  app.register(use(Web.provider));

  XMPPModule(use);

  await app.start();
}

main();
