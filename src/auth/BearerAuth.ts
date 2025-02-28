import { IncomingMessage } from "node:http";
import { AuthConfiguration } from "/configuration/AuthConfiguration";
import { use } from "/util/use";
import { Unauthorized } from "/configuration/Unauthorized";
import { Route } from "/Router";

const bearerLength = "Bearer ".length;

export class BearerAuth {
  #tokens: Set<string>;

  constructor(tokens: string[]) {
    this.#tokens = new Set(tokens);
  }

  authorise(req: IncomingMessage): void {
    const bearer = (req.headers["authorization"] || "").slice(bearerLength);
    if (!bearer || !this.#tokens.has(bearer)) throw new Unauthorized();
  }

  withAuth(route: Route): Route {
    return (req) => {
      this.authorise(req);
      return route(req);
    };
  }

  static provider(): BearerAuth {
    const config = use(AuthConfiguration.provider);
    return new BearerAuth(config.tokens);
  }
}
