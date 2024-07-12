import CK5Editor from "@/components/CK5Editor/CK5Editor";
import { useQuizData } from "../contexts/QuizProvider";

export default function QuizContent() {
	const QuizContext = useQuizData();
	const quizs = QuizContext.quizs;
	const setQuizs = QuizContext.setQuizs;
	const currentQuiz = QuizContext.currentQuiz;
	const isLoading = QuizContext.isLoading;

	const onChangeContent = (content: string) => {
		setQuizs((prevQuizs) => {
			const updatedQuizs = [...prevQuizs];
			updatedQuizs[currentQuiz] = {
				...updatedQuizs[currentQuiz],
				content: content,
			};
			return updatedQuizs;
		});
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="flex flex-row w-full gap-2 h-fit">
			<div className="w-1/2 h-fit">
				{quizs.map((_, index) => {
					if (currentQuiz != index) return;
					return (
						<CK5Editor
							key={index}
							content={quizs[currentQuiz].content}
							onChangeContent={onChangeContent}
						/>
					);
				})}
			</div>

			<div className="w-1/2 ml-8 h-fit"></div>
		</div>
	);
}
