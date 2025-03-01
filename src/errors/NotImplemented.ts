import { Respondable, Response } from "nomail/dto/Response.ts";
import { MIMETYPE } from "nomail/util/mimetype.ts";

export class NotImplemented extends Error implements Respondable {
  response(): Response {
    return new Response(
      500,
      { "Content-Type": MIMETYPE.TEXT },
      "Not implemented yet",
    );
  }
}
