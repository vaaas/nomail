import { IncomingMessage } from "node:http";
import { MailQueue } from "/persistence/MailQueue";
import { readBody } from "/util/http";
import { Response } from "/dto/Response";
import { MailParser } from "/parsers/MailParser";
import { MIMETYPE } from "/util/mimetype";
import { use } from "/util/use";
import { MethodNotAllowed } from "/errors/MethodNotAllowed";
import { XMPPMailQueue } from "./XMPPMailQueue";

export class XMPPController {
  #queue: MailQueue;

  constructor(queue: MailQueue) {
    this.#queue = queue;
  }

  async enqueue(req: IncomingMessage): Promise<Response> {
    if (req.method !== "POST") throw new MethodNotAllowed();
    const body = await readBody(req);
    const json = JSON.parse(body.toString("utf-8"));
    const mail = MailParser(json);
    this.#queue.push(mail);
    return new Response(202, { "Content-Type": MIMETYPE.TEXT }, "enqueued");
  }

  static provider(): XMPPController {
    const queue = use(XMPPMailQueue.provider);
    return new XMPPController(queue);
  }
}
