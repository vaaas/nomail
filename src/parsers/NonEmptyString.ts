import { IParser } from "./IParser.ts";
import { ParsingError } from "nomail/errors/ParsingError.ts";

export const NonEmptyString: IParser<string> = (x) => {
  if (typeof x !== "string" || x.length === 0)
    throw new ParsingError("expected non-empty string");
  return x;
};
