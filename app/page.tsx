"use client";
import { sendWritingEmail } from "./lib/email";
import { useUtility } from "./provider/UtilityProvider";

export default function Home() {
	const { setSuccess, setError } = useUtility();

	return (
		<main className="flex items-center justify-center flex-1 p-4 h-fit gap-2">
			<button
				onClick={() =>
					sendWritingEmail({
						name: "Vy",
						to: "quangtran.dvincent@gmail.com",
						title: "Writing test result",
						firstCriterion: "Grammar",
						secondCriterion: "Vocabulary",
						thirdCriterion: "Content",
						fourthCriterion: "Organization",
						score: 10,
						remark: "Good job",
					}).then((res) => {
						if (res) {
							setSuccess("Email sent successfully");
						} else {
							setError("Email failed to send");
						}
					})
				}
				className="p-4 bg-foreground-blue text-white rounded-md">
				Send mail
			</button>
		</main>
	);
}
