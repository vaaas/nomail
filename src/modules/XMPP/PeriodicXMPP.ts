import { XMPPConfiguration } from "./XMPPConfiguration";
import { XMPPMailer } from "./XMPPMailer";
import { XMPPMailQueue } from "./XMPPMailQueue";
import { PeriodicMail } from "nomail/services/PeriodicMail";
import { use } from "nomail/util/use";

export class PeriodicXMPP {
  static provider(): PeriodicMail {
    const mailer = use(XMPPMailer.provider);
    const queue = use(XMPPMailQueue.provider);
    const config = use(XMPPConfiguration.provider);
    return new PeriodicMail(mailer, queue, config.period);
  }
}
