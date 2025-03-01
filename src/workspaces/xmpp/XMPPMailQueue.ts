import { MailQueue } from "@nomail/mail";
import { XMPPConfiguration } from "./XMPPConfiguration";
import { use } from "@nomail/service-locator";

export class XMPPMailQueue {
  static provider(): MailQueue {
    const config = use(XMPPConfiguration.provider);
    return new MailQueue(config.maxQueueSize);
  }
}
