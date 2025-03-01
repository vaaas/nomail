import { IncomingMessage } from "node:http";
import { IService } from "./IService.ts";
import { Unary } from "./functions.ts";
import { Response } from "@nomail/http";

export type IModuleRoute = {
  path: string;
  handler: Unary<IncomingMessage, Promise<Response>>;
};

export type IModule = {
  routes: IModuleRoute[];
  services: IService[];
};
