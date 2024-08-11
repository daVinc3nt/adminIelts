"use client";
import { useTest } from "../provider/TestProvider";

export default function AudioPlayer() {
	const {
		test,
		currentQuizIndex,
		fileList,
		urlList,
		hasPrivilege,
		onChangeTest,
		onChangeFileList,
		onChangeUrlList,
	} = useTest();

	const onSelectFile = (event: any) => {
		if (event.target.files[0]) {
			const file = event.target.files[0];
			let newFileList = [...fileList];
			newFileList[currentQuizIndex] = file;
			onChangeFileList(newFileList);

			const urlPath = URL.createObjectURL(file);
			let newUrlList = [...urlList];
			newUrlList[currentQuizIndex] = urlPath;
			onChangeUrlList(newUrlList);

			const newTest = { ...test };
			newTest.listening[currentQuizIndex].filePath = null;
			onChangeTest(newTest);
		}
	};

	return (
		<div className="w-full h-fit flex flex-col bg-gray-100 dark:bg-[#3b3b3b] rounded-lg shadow-md">
			<audio
				src={urlList[currentQuizIndex]}
				controls
				className="w-full outline-none 1">
				Your browser does not support the audio element.
			</audio>
			<hr className="w-full border border-gray-200 dark:border-gray-400" />
			<input
				type="file"
				disabled={!hasPrivilege}
				id="audio"
				accept="audio/*"
				onChange={onSelectFile}
				className="file:border-none file:bg-gray-100 dark:file:bg-[#3b3b3b] file:p-1 file:px-4 rounded-md "
				hidden
			/>
			<label
				htmlFor="audio"
				className="block text-sm mr-4 py-1 px-4
            rounded-md border-0 font-semibold bg-gray-100 dark:bg-[#3b3b3b] cursor-pointer">
				Choose audio file
			</label>
			<label className="text-sm text-slate-500"></label>
		</div>
	);
}
