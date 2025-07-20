import { IncomingMessage, ServerResponse } from "node:http";
import { getReqBody } from "../utils/get-request-body";

interface PaymentsBody {
  correlationId: string;
  amount: number;
}

export async function createPayment(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
  const body = await getReqBody<PaymentsBody>(req);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(JSON.stringify(body));
}
