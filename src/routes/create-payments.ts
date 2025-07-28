import { IncomingMessage, ServerResponse } from "node:http";
import { getReqBody } from "../utils/get-request-body";
import { redisClient } from "../../server";

interface PaymentsBody {
  correlationId: string;
  amount: number;
}

export async function createPayment(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
  const body = await getReqBody<PaymentsBody>(req);
  
  const requestedAt = new Date().toISOString()

  await redisClient.lpush('rinha-queue', JSON.stringify({...body, requestedAt}))

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(
    JSON.stringify({
      message: "payment processed successfully",
    })
  );
}
