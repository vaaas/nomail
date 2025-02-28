import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import { Record } from "/parsers/Record.js";
import { NonEmptyString } from "/parsers/NonEmptyString.ts";

const parser = Record({
  xmpp: Record({
    service: NonEmptyString,
    domain: NonEmptyString,
    username: NonEmptyString,
    password: NonEmptyString,
    resource: NonEmptyString,
  }),
});

export class XMPPConfiguration {
  public readonly service: string;
  public readonly domain: string;
  public readonly username: string;
  public readonly password: string;
  public readonly resource: string;

  constructor(
    service: XMPPConfiguration["service"],
    domain: XMPPConfiguration["domain"],
    username: XMPPConfiguration["username"],
    password: XMPPConfiguration["password"],
    resource: XMPPConfiguration["resource"],
  ) {
    this.service = service;
    this.domain = domain;
    this.username = username;
    this.password = password;
    this.resource = resource;
  }

  static provider(): XMPPConfiguration {
    const pathname = `${cwd()}/storage/configuration.json`;
    const contents = readFileSync(pathname).toString("utf-8");
    const config = parser(JSON.parse(contents));
    return new XMPPConfiguration(
      config.xmpp.service,
      config.xmpp.domain,
      config.xmpp.username,
      config.xmpp.password,
      config.xmpp.resource,
    );
  }
}
