import { Respondable, Response } from "nomail/dto/Response";
import { MIMETYPE } from "nomail/util/mimetype";

export class Unauthorized extends Error implements Respondable {
  response(): Response {
    return new Response(401, { "Content-Type": MIMETYPE.TEXT }, "Unauthorized");
  }
}
