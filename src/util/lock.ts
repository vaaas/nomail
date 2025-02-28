export class Lock {
  #running: boolean;

  constructor() {
    this.#running = false;
  }

  run(f: () => Promise<void>): Promise<void> {
    if (this.#running) {
      return Promise.reject(
        new Error("lock is already running so refusing to run twice"),
      );
    }
    this.#running = true;
    return f().finally(() => (this.#running = false));
  }

  isRunning(): boolean {
    return this.#running;
  }
}
