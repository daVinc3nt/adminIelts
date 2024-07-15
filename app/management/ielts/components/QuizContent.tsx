import CK5Editor from "@/components/CK5Editor/CK5Editor";
import { useQuizData } from "../contexts/QuizDataProvider";

export default function QuizContent() {
	return (
		<div className="flex flex-row w-full gap-2 h-fit">
			<div className="w-1/2 h-fit">
				{[].map((_, index) => {
					return <div key={index}></div>;
				})}
			</div>

			<div className="w-1/2 ml-8 h-fit"></div>
		</div>
	);
}
