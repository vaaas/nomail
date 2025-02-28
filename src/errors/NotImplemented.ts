import { Respondable, Response } from "/dto/Response.ts";
import { MIMETYPE } from "/util/mimetype.ts";

export class NotImplemented extends Error implements Respondable {
  response(): Response {
    return new Response(
      500,
      { "Content-Type": MIMETYPE.TEXT },
      "Not implemented yet",
    );
  }
}
