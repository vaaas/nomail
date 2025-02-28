import * as http from "node:http";
import { HTTPConfiguration } from "/configuration/HTTPConfiguration.ts";
import { use as defaultUse } from "/util/use.ts";
import { MIMETYPE } from "/util/mimetype.ts";
import { isRespondable, Response } from "/dto/Response.ts";
import { Router } from "/Router";

export class Web implements IService {
  #config: HTTPConfiguration;
  #router: Router;
  #server: http.Server;

  constructor(config: HTTPConfiguration, router: Router) {
    this.#config = config;
    this.#router = router;
    this.#server = http.createServer((req, res) =>
      this.#requestListener(req, res),
    );
  }

  start(): Promise<void> {
    return new Promise((done) => {
      this.#server.listen(this.#config.port, this.#config.host, () => done());
    });
  }

  stop(): Promise<void> {
    return new Promise((done) => {
      this.#server.close(() => done());
    });
  }

  async #requestListener(req: http.IncomingMessage, res: http.ServerResponse) {
    let response: Response;
    try {
      response = await this.#router.route(req);
    } catch (err) {
      response = this.#errorHandler(err);
    }
    res.writeHead(response.status, response.headers);
    res.end(response.body);
  }

  #errorHandler(err: unknown): Response {
    if (!(err instanceof Error)) {
      return new Response(
        500,
        { "Content-Type": MIMETYPE.TEXT },
        "Unexpected error",
      );
    } else if (isRespondable(err)) {
      return err.response();
    } else {
      console.log(err.message);
      return new Response(
        500,
        { "Content-Type": MIMETYPE.TEXT },
        "Internal server error",
      );
    }
  }

  static provider(use = defaultUse): Web {
    const config = use(HTTPConfiguration.provider);
    const router = use(Router.provider);
    return new Web(config, router);
  }
}
