import { Respondable, Response } from "../Response.ts";
import { MIMETYPE } from "../mimetype.ts";

export class MethodNotAllowed extends Error implements Respondable {
  response(): Response {
    return new Response(
      405,
      { "Content-Type": MIMETYPE.TEXT },
      "Method not allowed",
    );
  }
}
