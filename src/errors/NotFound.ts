import { Respondable, Response } from "/dto/Response.ts";
import { MIMETYPE } from "/util/mimetype.ts";

export class NotFound extends Error implements Respondable {
  response(): Response {
    return new Response(404, { "Content-Type": MIMETYPE.TEXT }, "Not found");
  }
}
