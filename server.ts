import { createServer } from "node:http";
import { createClient } from "redis";
import { createPayment } from "./src/routes/create-payments";
import envVariables from "./src/utils/validate-env";

const PORT = envVariables.APP_PORT || 8080;

const server = createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/payments") {
    await createPayment(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

export const client = createClient().on("error", console.error);

client.connect();
