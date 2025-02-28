import { IncomingMessage } from "node:http";
import { Buffer } from "node:buffer";

export async function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const bufs: Buffer[] = [];
    req.on("data", (chunk) => bufs.push(chunk));
    req.on("end", () => resolve(Buffer.concat(bufs)));
    req.on("error", () => reject(new Error("error reading request body")));
  });
}
