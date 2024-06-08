"use client";
import { useCallback, useEffect, useRef, useState } from "react";

function AudioPlayer({ audio }: { audio: File }) {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = URL.createObjectURL(audio);
			audioRef.current.load();
		}
		return () => {
			if (audioRef.current) {
				audioRef.current.src = "";
				URL.revokeObjectURL(audioRef.current.src);
			}
		};
	}, [audio]);

	return (
		<audio ref={audioRef} controls className="outline-none">
			Your browser does not support the audio element.
		</audio>
	);
}

interface Props {
	className?: string;
}

export default function AudioDropInput({ className }: Props) {
	const [audio, setAudio] = useState<File | null>(null);

	const onDrop = useCallback((event: any) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		if (file.type.startsWith("audio/")) {
			setAudio(file);
		}
	}, []);

	const onDragOver = useCallback((event: any) => {
		event.preventDefault();
	}, []);

	return (
		<div
			className="flex items-center justify-center w-full h-full border-2 border-red-400 border-dashed rounded-xl"
			onDrop={onDrop}
			onDragOver={onDragOver}>
			{audio ? (
				<AudioPlayer audio={audio} />
			) : (
				<div className={className}>Drop an audio file here!</div>
			)}
		</div>
	);
}
