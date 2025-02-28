import { Respondable, Response } from "/dto/Response.ts";
import { MIMETYPE } from "/util/mimetype.ts";

export class MethodNotAllowed extends Error implements Respondable {
  response(): Response {
    return new Response(
      405,
      { "Content-Type": MIMETYPE.TEXT },
      "Method not allowed",
    );
  }
}
