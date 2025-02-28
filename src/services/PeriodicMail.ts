import { IMailer } from "/mailers/IMailer";
import { XMPPMailer } from "/mailers/XMPPMailer";
import { MailQueue, XMPPMailQueue } from "/persistence/MailQueue";
import { Lock } from "/util/lock";
import { use } from "/util/use";

export class PeriodicMail {
  #mailer: IMailer;
  #queue: MailQueue;
  #id: ReturnType<typeof setInterval> | undefined;
  #dt: number;
  #lock: Lock;

  constructor(mailer: IMailer, queue: MailQueue, dt: number) {
    this.#mailer = mailer;
    this.#queue = queue;
    this.#id = undefined;
    this.#dt = dt;
    this.#lock = new Lock();
  }

  start(): Promise<void> {
    this.#id = setInterval(() => this.#periodicSend(), this.#dt);
    return Promise.resolve();
  }

  #periodicSend() {
    if (this.#queue.isEmpty()) return;
    if (this.#lock.isRunning()) return;
    console.log("Attempting to send enqueued pessages");
    this.#lock.run(() =>
      this.#queue
        .consumeBatch((mails) => this.#mailer.sendBatch(mails))
        .then(() => console.log("successfully sent enqueud messages"))
        .catch((error: Error) => console.error(error.message)),
    );
  }
}

export class PeriodicXMPP {
  static provider(): PeriodicMail {
    const mailer = use(XMPPMailer.provider);
    const queue = use(XMPPMailQueue.provider);
    return new PeriodicMail(mailer, queue, 1_000);
  }
}
