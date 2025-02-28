import { IncomingMessage } from "node:http";
import { NotFound } from "/errors/NotFound.ts";
import { Response } from "/dto/Response.ts";
import { XMPPController } from "./XMPPController";
import { use } from "/util/use";
import { BearerAuth } from "/auth/BearerAuth";

export class Router {
  #xmpp: XMPPController;
  #auth: BearerAuth;

  constructor(xmpp: XMPPController, auth: BearerAuth) {
    this.#xmpp = xmpp;
    this.#auth = auth;
  }

  route(req: IncomingMessage): Promise<Response> {
    this.#auth.authorise(req);
    switch (req.url || "") {
      case "/xmpp":
        return this.#xmpp.enqueue(req);

      default:
        return Promise.reject(new NotFound());
    }
  }

  static provider(): Router {
    const xmpp = use(XMPPController.provider);
    const auth = use(BearerAuth.provider);
    return new Router(xmpp, auth);
  }
}
