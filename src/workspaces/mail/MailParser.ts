import { BoundedString, IParser, Record } from "@nomail/parsing";
import { Mail } from "./Mail.ts";

export const MailParser: IParser<Mail> = Record({
  from: BoundedString(3, 255),
  to: BoundedString(3, 255),
  subject: BoundedString(1, 255),
  body: BoundedString(1, 5_000),
});
