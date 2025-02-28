import { use } from "./util/use";

export class App {
  #services: IService[];

  constructor() {
    this.#services = [];
  }

  register(service: IService): App {
    this.#services.push(service);
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
