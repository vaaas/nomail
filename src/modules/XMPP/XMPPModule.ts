import { IModule } from "nomail/modules/IModule";
import { PeriodicXMPP } from "./PeriodicXMPP";
import { XMPPController } from "./XMPPController";
import { App } from "nomail/App";
import { Router } from "nomail/Router";

export const XMPPModule: IModule = (use) => {
  console.log("registering XMPP feature");

  const app = use(App.provider);
  app.register(use(PeriodicXMPP.provider));

  const router = use(Router.provider);
  const controller = use(XMPPController.provider);
  router.add("/xmpp", controller.enqueue.bind(controller));
};
