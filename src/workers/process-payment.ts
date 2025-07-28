export async function processPayment(payment: {
	key: string;
	element: string;
}) {
	const requestBody = JSON.parse(payment.element);

	return requestBody;
}
