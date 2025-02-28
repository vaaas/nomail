import { XMPPConfiguration } from "./XMPPConfiguration";
import { MailQueue } from "/persistence/MailQueue";
import { use } from "/util/use";

export class XMPPMailQueue {
  static provider(): MailQueue {
    const config = use(XMPPConfiguration.provider);
    return new MailQueue(config.maxQueueSize);
  }
}
