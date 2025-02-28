import { IncomingMessage } from "node:http";
import { NotFound } from "/errors/NotFound.ts";
import { Response } from "/dto/Response.ts";
import { XMPPController } from "./XMPPController";
import { use } from "/util/use";

export class Router {
  #xmpp: XMPPController;

  constructor(xmpp: XMPPController) {
    this.#xmpp = xmpp;
  }

  route(req: IncomingMessage): Promise<Response> {
    switch (req.url || "") {
      case "/xmpp":
        return this.#xmpp.enqueue(req);

      default:
        return Promise.reject(new NotFound());
    }
  }

  static provider(): Router {
    const xmpp = use(XMPPController.provider);
    return new Router(xmpp);
  }
}
