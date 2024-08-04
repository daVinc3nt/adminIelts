"use client";
import { useEffect, useRef } from "react";
import { useTest } from "../provider/TestProvider";

export default function AudioPlayer() {
	const {
		fileList,
		onChangeFileList,
		currentQuizIndex,
		urlList,
		test,
		onChangeTest,
	} = useTest();

	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (audioRef.current && fileList[currentQuizIndex]) {
			audioRef.current.src = URL.createObjectURL(
				fileList[currentQuizIndex]
			);
			audioRef.current.load();
		}
		return () => {
			if (audioRef.current) {
				audioRef.current.src = "";
				URL.revokeObjectURL(audioRef.current.src);
			}
		};
	}, [fileList, currentQuizIndex]);

	const onSelectFile = (event: any) => {
		if (event.target.files[0]) {
			const file = event.target.files[0];
			let newFileList = [...fileList];
			newFileList[currentQuizIndex] = file;
			onChangeFileList(newFileList);
			const newTest = { ...test };
			newTest.listening[currentQuizIndex].filePath = null;
			onChangeTest(newTest);
		}
	};

	const currentFilePath = test.listening[currentQuizIndex].filePath;

	return (
		<div className="w-full h-fit flex flex-col bg-gray-100 dark:bg-[#3b3b3b] rounded-lg shadow-md">
			{!currentFilePath ? (
				<audio
					ref={audioRef}
					controls
					className="2 outline-none w-full">
					Your browser does not support the audio element.
				</audio>
			) : (
				<audio
					src={urlList[currentQuizIndex]}
					controls
					className="1 outline-none w-full">
					Your browser does not support the audio element.
				</audio>
			)}
			<hr className="w-full border border-gray-200 dark:border-gray-400" />
			<input
				type="file"
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
