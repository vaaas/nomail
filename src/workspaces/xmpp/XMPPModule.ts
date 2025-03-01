import { IModule } from "@nomail/common";
import { PeriodicXMPP } from "./PeriodicXMPP.ts";
import { XMPPController } from "./XMPPController.ts";
import { use } from "@nomail/service-locator";

export function XMPPModule(): IModule {
  const controller = use(XMPPController.provider);
  const periodicXMPP = use(PeriodicXMPP.provider);
  return {
    routes: [
      {
        path: "/xmpp",
        handler: controller.enqueue.bind(controller)
      }
    ],
    services: [periodicXMPP],
  };
}
