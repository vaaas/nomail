import { Respondable, Response } from "nomail/dto/Response.ts";
import { MIMETYPE } from "nomail/util/mimetype.ts";

export class NotFound extends Error implements Respondable {
  response(): Response {
    return new Response(404, { "Content-Type": MIMETYPE.TEXT }, "Not found");
  }
}
