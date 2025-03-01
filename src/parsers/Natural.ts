import { IParser } from "./IParser";
import { ParsingError } from "nomail/errors/ParsingError";

export const Natural: IParser<number> = (x) => {
  if (typeof x !== "number" || !Number.isInteger(x) || x < 1)
    throw new ParsingError("expected natural number");
  else return x;
};
