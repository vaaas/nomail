import { IncomingMessage } from "node:http";
import { NotFound } from "nomail/errors/NotFound.ts";
import { Response } from "nomail/dto/Response.ts";
import { BearerAuth } from "./auth/BearerAuth";
import { use } from "./util/use";

export type Route = (request: IncomingMessage) => Promise<Response>;

export class Router {
  #routes: Record<string, Route>;
  #auth: BearerAuth;

  constructor(routes: Record<string, Route>, auth: BearerAuth) {
    this.#routes = routes;
    this.#auth = auth;
  }

  route(req: IncomingMessage): Promise<Response> {
    const url = req.url || "";
    const route = this.#routes[url];
    if (!route) return Promise.reject(new NotFound());
    else return route(req);
  }

  add(location: string, route: Route): void {
    this.#routes[location] = this.#auth.withAuth(route);
  }

  static provider(): Router {
    const auth = use(BearerAuth.provider);
    return new Router(
      {
        "/health": () => Promise.resolve(new Response(200, {}, "healthy")),
      },
      auth,
    );
  }
}
