import { IMailer } from "/mailers/IMailer";
import { MailQueue } from "/persistence/MailQueue";
import { Lock } from "/util/lock";
import { use } from "/util/use";

export class PeriodicMail implements IService {
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

  stop(): Promise<void> {
    clearInterval(this.#id);
    this.#id = undefined;
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
        .catch((error: Error) =>
          console.log(
            "Something wrong happened while sending messages",
            error.message,
          ),
        ),
    );
  }
}
