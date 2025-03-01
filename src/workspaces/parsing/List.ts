import { IParser } from "./IParser.ts";
import { ParsingError } from "./ParsingError.ts";

export function List<T>(parser: IParser<T>, allowEmpty = true): IParser<T[]> {
  return function (x) {
    if (!Array.isArray(x) || (x.length === 0 && !allowEmpty))
      throw new ParsingError("invalid array");
    else return x.map(parser);
  };
}
