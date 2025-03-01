import { Respondable, Response, MIMETYPE } from "@nomail/http";

export class NotImplemented extends Error implements Respondable {
  response(): Response {
    return new Response(
      500,
      { "Content-Type": MIMETYPE.TEXT },
      "Not implemented yet",
    );
  }
}
