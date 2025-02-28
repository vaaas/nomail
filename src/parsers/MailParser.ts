import { BoundedString } from "./BoundedString";
import { IParser } from "./IParser";
import { Record } from "./Record";
import { Mail } from "/dto/Mail";

export const MailParser: IParser<Mail> = Record({
  from: BoundedString(3, 255),
  to: BoundedString(3, 255),
  subject: BoundedString(1, 255),
  body: BoundedString(1, 5_000),
});
