import { createServer } from "node:http";
import { createClient } from "redis";
import { createPayment } from "./src/routes/create-payments";
import envVariables from "./src/utils/validate-env";
import { startWorkers } from "./src/workers";

const PORT = envVariables.APP_PORT || 8080;

startWorkers(10).then(() => {
	console.log("Workers started");
});

const server = createServer(async (req, res) => {
	if (req.method === "POST" && req.url === "/payments") {
		await createPayment(req, res);
	}
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

export const redisClient = createClient().on("error", console.error);
redisClient.connect();
