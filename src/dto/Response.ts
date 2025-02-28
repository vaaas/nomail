export class Response {
  public readonly status: number;
  public readonly headers: Record<string, string>;
  public readonly body: string;

  constructor(
    status: Response["status"],
    headers: Response["headers"],
    body: Response["body"],
  ) {
    this.status = status;
    this.headers = headers;
    this.body = body;
  }
}

export interface Respondable {
  response(): Response;
}

export function isRespondable(x: unknown): x is Respondable {
  return (
    typeof x === "object" &&
    x !== null &&
    "response" in x &&
    typeof x.response === "function"
  );
}
