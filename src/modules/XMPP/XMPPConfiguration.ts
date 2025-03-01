import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import { Record } from "nomail/parsers/Record.js";
import { NonEmptyString } from "nomail/parsers/NonEmptyString.ts";
import { Natural } from "nomail/parsers/Natural";

const parser = Record({
  xmpp: Record({
    service: NonEmptyString,
    username: NonEmptyString,
    password: NonEmptyString,
    resource: NonEmptyString,
    period: Natural,
    maxQueueSize: Natural,
  }),
});

export class XMPPConfiguration {
  public readonly service: string;
  public readonly username: string;
  public readonly password: string;
  public readonly resource: string;
  public readonly period: number;
  public readonly maxQueueSize: number;

  constructor(
    service: XMPPConfiguration["service"],
    username: XMPPConfiguration["username"],
    password: XMPPConfiguration["password"],
    resource: XMPPConfiguration["resource"],
    period: XMPPConfiguration["period"],
    maxQueueSize: XMPPConfiguration["maxQueueSize"],
  ) {
    this.service = service;
    this.username = username;
    this.password = password;
    this.resource = resource;
    this.period = period;
    this.maxQueueSize = maxQueueSize;
  }

  static provider(): XMPPConfiguration {
    const pathname = `${cwd()}/storage/configuration.json`;
    const contents = readFileSync(pathname).toString("utf-8");
    const config = parser(JSON.parse(contents));
    return new XMPPConfiguration(
      config.xmpp.service,
      config.xmpp.username,
      config.xmpp.password,
      config.xmpp.resource,
      config.xmpp.period,
      config.xmpp.maxQueueSize,
    );
  }
}
