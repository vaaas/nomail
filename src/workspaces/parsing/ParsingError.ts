import { MIMETYPE, Respondable, Response } from "@nomail/http";

export class ParsingError extends Error implements Respondable {
  constructor(message: string) {
    super(message);
  }

  response(): Response {
    return new Response(400, { "Content-Type": MIMETYPE.TEXT }, this.message);
  }
}
