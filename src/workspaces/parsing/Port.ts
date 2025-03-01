import { IParser } from "./IParser.ts";
import { ParsingError } from "./ParsingError.ts";

export const Port: IParser<number> = (x) => {
  if (typeof x !== "number" || !Number.isInteger(x) || x < 1 || x > 65535) {
    throw new ParsingError("invalid port");
  } else {
    return x;
  }
};
