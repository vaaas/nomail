import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import { Record } from "nomail/parsers/Record.js";
import { NonEmptyString } from "nomail/parsers/NonEmptyString.ts";
import { Port } from "nomail/parsers/Port.ts";

const parser = Record({
  http: Record({
    host: NonEmptyString,
    port: Port,
  }),
});

export class HTTPConfiguration {
  public readonly host: string;
  public readonly port: number;

  constructor(
    host: HTTPConfiguration["host"],
    port: HTTPConfiguration["port"],
  ) {
    this.host = host;
    this.port = port;
  }

  static provider(): HTTPConfiguration {
    const pathname = `${cwd()}/storage/configuration.json`;
    const contents = readFileSync(pathname).toString("utf-8");
    const config = parser(JSON.parse(contents));
    return new HTTPConfiguration(config.http.host, config.http.port);
  }
}
