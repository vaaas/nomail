import { Mail } from "./Mail.ts";

export interface IMailer {
  sendBatch(mail: Mail[]): Promise<void>;
}
