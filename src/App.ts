import { PeriodicMail, PeriodicXMPP } from "./services/PeriodicMail";
import { Web } from "./services/Web";
import { use } from "./util/use";

export class App {
  #web: Web;
  #periodicXMPP: PeriodicMail;

  constructor() {
    this.#web = use(Web.provider);
    this.#periodicXMPP = use(PeriodicXMPP.provider);
  }

  async start(): Promise<void> {
    console.log("starting all services");
    await this.#web.start();
    await this.#periodicXMPP.start();
    console.log("started all services");
  }
}
