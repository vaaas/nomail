import { Mail } from "nomail/dto/Mail.ts";

export interface IMailer {
  sendBatch(mail: Mail[]): Promise<void>;
}
