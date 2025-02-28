import { Mail } from "/dto/Mail.ts";

export interface IMailer {
  sendBatch(mail: Mail[]): Promise<void>;
}
