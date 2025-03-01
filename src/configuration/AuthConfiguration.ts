import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import { Record } from "nomail/parsers/Record.js";
import { NonEmptyString } from "nomail/parsers/NonEmptyString.ts";
import { Port } from "nomail/parsers/Port.ts";
import { List } from "nomail/parsers/List";

const parser = Record({
  auth: Record({
    tokens: List(NonEmptyString),
  }),
});

export class AuthConfiguration {
  public readonly tokens: string[];

  constructor(tokens: string[]) {
    this.tokens = tokens;
  }

  static provider(): AuthConfiguration {
    const pathname = `${cwd()}/storage/configuration.json`;
    const contents = readFileSync(pathname).toString("utf-8");
    const config = parser(JSON.parse(contents));
    return new AuthConfiguration(config.auth.tokens);
  }
}
