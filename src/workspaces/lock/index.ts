export class Lock {
  #running: boolean;

  constructor() {
    this.#running = false;
  }

  run(f: () => Promise<void>): Promise<void> {
    if (this.#running) {
      return Promise.reject(new LockAlreadyRunning());
    }
    this.#running = true;
    return f().finally(() => (this.#running = false));
  }

  isRunning(): boolean {
    return this.#running;
  }
}

export class LockAlreadyRunning extends Error {
  constructor() {
    super("Lock is already running. Refusing to run twice.");
  }
}
