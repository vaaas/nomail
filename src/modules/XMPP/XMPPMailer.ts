/** @ts-ignore */
import { client, xml } from "@xmpp/client";
/** @ts-ignore */
import jid from "@xmpp/jid";

import { Mail } from "nomail/dto/Mail.ts";
import { use as defaultUse } from "nomail/util/use.ts";
import { XMPPConfiguration } from "./XMPPConfiguration";
import { IMailer } from "nomail/mailers/IMailer";

export class XMPPMailer implements IMailer {
  private readonly config: XMPPConfiguration;

  constructor(config: XMPPConfiguration) {
    this.config = config;
  }

  sendBatch(mails: Mail[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const xmppClient = client({
        service: this.config.service,
        resource: this.config.resource,
        username: this.config.username,
        password: this.config.password,
      });
      xmppClient.on("error", (err: unknown) => {
        reject(err instanceof Error ? err : new Error(err + ""));
      });

      xmppClient.on("online", async (address: unknown) => {
        await xmppClient.send(xml("presence"));
        for (const mail of mails) {
          await xmppClient
            .send(XMPPMailer.mail_to_xmp(mail))
            .catch((error: Error) => {
              reject(error);
              throw error;
            });
        }
        xmppClient.stop().then(() => resolve());
      });

      // FIXME: workaround for retarded logging
      const original = console.log;
      console.log = () => undefined;
      xmppClient
        .start()
        .catch(reject)
        .finally(() => (console.log = original));
    });
  }

  static mail_to_xmp(mail: Mail): unknown {
    return xml(
      "message",
      { type: "chat", to: jid(mail.to) },
      xml("body", {}, XMPPMailer.makeBody(mail)),
    );
  }

  static makeBody(mail: Mail): string {
    return [
      "New mail received!",
      `From: ${mail.from}`,
      `Subject: ${mail.subject}`,
      "",
      mail.body,
    ].join("\n");
  }

  static provider(use = defaultUse): XMPPMailer {
    return new XMPPMailer(use(XMPPConfiguration.provider));
  }
}
