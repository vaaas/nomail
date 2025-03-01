import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import { Record, List, NonEmptyString } from "@nomail/parsing";

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
