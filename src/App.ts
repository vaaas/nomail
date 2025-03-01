import { IModule, IService } from "@nomail/common";
import { Router, Web } from "@nomail/http";
import { use } from "@nomail/service-locator";

export class App {
  #services: IService[];

  constructor() {
    this.#services = [use(Web.provider)];
  }

  register(module: IModule): App {
    for (const service of module.services) this.#services.push(service);

    const router = use(Router.provider);
    for (const route of module.routes) router.add(route.path, route.handler);

    return this;
  }

  async start(): Promise<void> {
    console.log("starting all services");
    for (const service of this.#services) await service.start();
    console.log("started all services");
  }

  async stop(): Promise<void> {
    console.log("stopping all services");
    for (const service of this.#services) await service.stop();
    console.log("stopped all services");
  }

  static provider(): App {
    return new App();
  }
}
