import { Respondable, Response } from "nomail/dto/Response.ts";
import { MIMETYPE } from "nomail/util/mimetype.ts";

export class ParsingError extends Error implements Respondable {
  constructor(message: string) {
    super(message);
  }

  response(): Response {
    return new Response(400, { "Content-Type": MIMETYPE.TEXT }, this.message);
  }
}
