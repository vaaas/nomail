import { Respondable, Response } from "/dto/Response.ts";
import { MIMETYPE } from "/util/mimetype.ts";

export class QueueSizeExceeded extends Error implements Respondable {
  constructor() {
    super("maximum queue size exceeded");
  }

  response(): Response {
    return new Response(429, { "Content-Type": MIMETYPE.TEXT }, this.message);
  }
}
