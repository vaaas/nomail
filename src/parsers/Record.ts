import { IParser } from "./IParser.ts";
import { ParsingError } from "nomail/errors/ParsingError.ts";

const parseRecord: IParser<Record<string | symbol | number, unknown>> = (x) => {
  if (typeof x !== "object" || x === null)
    throw new ParsingError("expected a record");
  else return x as Record<string | symbol, unknown>;
};

export function Record<T extends Record<string, any>>(parsers: {
  [key in keyof T]: IParser<T[key]>;
}): IParser<T> {
  const expected: Array<[keyof T, T[keyof T]]> = Object.entries(parsers);
  return function (x) {
    const record = parseRecord(x);
    const parsed: Partial<T> = {};
    for (const [k, parser] of expected) {
      const v = record[k];
      parsed[k] = parser(v);
    }
    return parsed as T;
  };
}
