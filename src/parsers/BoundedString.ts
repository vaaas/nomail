import { IParser } from "./IParser";
import { ParsingError } from "nomail/errors/ParsingError";

export const BoundedString =
  (min: number = 0, max: number = Infinity): IParser<string> =>
  (x) => {
    if (typeof x !== "string" || x.length < min || x.length > max)
      throw new ParsingError("invalid string");
    else return x;
  };
