import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import { Record } from "/parsers/Record.js";
import { NonEmptyString } from "/parsers/NonEmptyString.ts";
import { Port } from "/parsers/Port.ts";
import { List } from "/parsers/List";

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
