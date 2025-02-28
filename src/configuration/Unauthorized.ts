import { Respondable, Response } from "/dto/Response";
import { MIMETYPE } from "/util/mimetype";

export class Unauthorized extends Error implements Respondable {
  response(): Response {
    return new Response(401, { "Content-Type": MIMETYPE.TEXT }, "Unauthorized");
  }
}
