import { XMPPConfiguration } from "/configuration/XMPPConfiguration";
import { Mail } from "/dto/Mail.ts";
import { QueueSizeExceeded } from "/errors/QueueSizeExceeded";
import { Unary } from "/util/functions.ts";
import { use } from "/util/use";

export class MailQueue {
  #store: Map<number, Mail>;
  #i: number;
  #max: number;

  constructor(max: number) {
    this.#i = 0;
    this.#store = new Map();
    this.#max = max;
  }

  push(mail: Mail) {
    if (this.#store.size >= this.#max) throw new QueueSizeExceeded();
    this.#store.set(this.#i, mail);
    this.#inc();
  }

  #inc() {
    this.#i = this.#i === Number.MAX_SAFE_INTEGER ? 0 : this.#i + 1;
  }

  isEmpty(): boolean {
    return this.#store.size === 0;
  }

  async consumeBatch(then: Unary<Mail[], Promise<void>>): Promise<void> {
    const keys = Array.from(this.#store.keys());
    const values = keys.map((x) => this.#store.get(x)!);
    await then(values);
    for (const key of keys) this.#store.delete(key);
  }
}

export class XMPPMailQueue {
  static provider(): MailQueue {
    const config = use(XMPPConfiguration.provider);
    return new MailQueue(config.maxQueueSize);
  }
}
