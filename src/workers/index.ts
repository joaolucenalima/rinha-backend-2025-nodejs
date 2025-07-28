import { redisClient } from "../../server";
import { processPayment } from "./process-payment";

export async function startWorkers(instances: number) {
	let activeWorkers = 0;
	
	while (activeWorkers < instances) {
		const queueItem = await redisClient.brPop("redis-queue", 0);
		if (!queueItem) break;

		console.log('[INFO] item found in queue:', queueItem)	
		activeWorkers++;

		processPayment(queueItem)
			.catch((err) => {
				console.error("[ERROR] Error while processing payment:", err);
			})
			.finally(() => {
				activeWorkers--;
			});
	}
}
