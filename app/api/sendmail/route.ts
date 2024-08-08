import { sendMail } from "@/utils/sendmail";

export async function POST(request: Request) {
	const { name, to, subject, message } = await request.json();

	const sender = {
		name: "Engonow",
		address: process.env.EMAIL,
	};
	const receipient = {
		name: name,
		address: to,
	};

	try {
		const res = await sendMail({
			sender,
			receipient,
			subject: subject,
			message: message,
		});
		return Response.json({
			accepted: res.accepted,
		});
	} catch (err) {
		console.error(err);
	}
}
