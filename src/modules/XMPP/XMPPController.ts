import { IncomingMessage } from "node:http";
import { readBody } from "nomail/util/http";
import { Response } from "nomail/dto/Response";
import { MailParser } from "nomail/parsers/MailParser";
import { MIMETYPE } from "nomail/util/mimetype";
import { use } from "nomail/util/use";
import { MethodNotAllowed } from "nomail/errors/MethodNotAllowed";
import { XMPPMailQueue } from "./XMPPMailQueue";
import { MailQueue } from "nomail/modules/MailQueue";

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
