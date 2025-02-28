import { Respondable, Response } from "/dto/Response.ts";
import { MIMETYPE } from "/util/mimetype.ts";

export class ParsingError extends Error implements Respondable {
  constructor(message: string) {
    super(message);
  }

  response(): Response {
    return new Response(400, { "Content-Type": MIMETYPE.TEXT }, this.message);
  }
}
