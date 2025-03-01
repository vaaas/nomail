import { Respondable, Response } from "../Response.ts";
import { MIMETYPE } from "../mimetype.ts";

export class Unauthorized extends Error implements Respondable {
  response(): Response {
    return new Response(401, { "Content-Type": MIMETYPE.TEXT }, "Unauthorized");
  }
}
