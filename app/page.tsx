"use client";
import NavBar from "@/components/Navbar/Navbar";
import SlideIn from "@/components/AnimationWrapper/SlideIn";
import { motion } from "framer-motion";
import EaseIn from "@/components/AnimationWrapper/EaseIn";
import CourseCard from "@/components/Card/CourseCard";

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="w-full h-fit pt-14">
				<div className="w-full h-144 bg-primary p-8">
					<div className="w-full h-full rounded-lg border shadow-lg flex flex-col p-16 gap-4"></div>
				</div>

				<div className="w-full h-fit bg-white flex justify-center items-center p-8">
					<div className="w-8/12 h-fit bg-primary rounded-lg border shadow-lg flex flex-col justify-start items-center p-4 gap-8">
						<div className="w-fit h-fit text-4xl font-bold">
							<EaseIn>
								<div>
									Luyện thi IELTS Online miễn phí mỗi ngày
								</div>
							</EaseIn>
						</div>
						<div className="w-10/12 h-fit text-xl font-semibold text-center">
							<EaseIn delay={0.1}>
								<div>
									Engonow là một website luyện thi IELTS trực
									tuyến miễn phí với các câu hỏi và bài kiểm
									tra hỗ trợ người học luyện tập mọi lúc mọi
									nơi. Bạn có thể làm bài kiểm tra IELTS miễn
									phí với đầy đủ 4 kỹ năng nghe, nói, đọc,
									viết có đáp án giúp bạn tra cứu dễ dàng.
									Luyện tập IELTS ngay hôm nay!!!
								</div>
							</EaseIn>
						</div>

						<div className="w-full h-fit grid grid-cols-3 gap-4">
							<CourseCard
								title="IELTS Reading"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus mollis tempor. Maecenas sit amet scelerisque ex."
								bg="reading"
								path="\reading\1"
							/>
							<CourseCard
								title="IELTS Listening"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus mollis tempor. Maecenas sit amet scelerisque ex."
								bg="listening"
								path="\listening\1"
							/>
							<CourseCard
								title="IELTS Writing"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus mollis tempor. Maecenas sit amet scelerisque ex."
								bg="writing"
								path=""
							/>
							<CourseCard
								title="IELTS Speaking"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus mollis tempor. Maecenas sit amet scelerisque ex."
								bg="speaking"
								path=""
							/>
						</div>
					</div>
				</div>

				<div className="w-full h-128 bg-primary p-8"></div>
			</div>
		</>
	);
}
