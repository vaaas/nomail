import { IParser } from "./IParser";
import { ParsingError } from "nomail/errors/ParsingError";

export function List<T>(parser: IParser<T>, allowEmpty = true): IParser<T[]> {
  return function (x) {
    if (!Array.isArray(x) || (x.length === 0 && !allowEmpty))
      throw new ParsingError("invalid array");
    else return x.map(parser);
  };
}
