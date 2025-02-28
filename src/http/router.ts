import { IncomingMessage } from "node:http";
import { NotFound } from "/errors/NotFound.ts";
import { Response } from "/dto/Response.ts";
import { use } from "/util/use";
import { BearerAuth } from "/auth/BearerAuth";

type Route = (request: IncomingMessage) => Promise<Response>;

export class Router {
  #auth: BearerAuth;
  #routes: Record<string, Route>;

  constructor(auth: BearerAuth) {
    this.#auth = auth;
    this.#routes = {};
  }

  route(req: IncomingMessage): Promise<Response> {
    this.#auth.authorise(req);
    const route = this.#routes[req.url || ""];
    if (!route) return Promise.reject(new NotFound());
    else return route(req);
  }

  add(location: string, route: Route): void {
    this.#routes[location] = route;
  }

  static provider(): Router {
    const auth = use(BearerAuth.provider);
    return new Router(auth);
  }
}
