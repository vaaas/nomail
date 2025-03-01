import { IParser } from "./IParser.ts";
import { ParsingError } from "./ParsingError.ts";

export const BoundedString =
  (min: number = 0, max: number = Infinity): IParser<string> =>
  (x) => {
    if (typeof x !== "string" || x.length < min || x.length > max)
      throw new ParsingError("invalid string");
    else return x;
  };
