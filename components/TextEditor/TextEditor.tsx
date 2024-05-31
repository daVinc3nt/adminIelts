"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
	className?: string;
	placeholder?: string;
	text: string;
	onChangeText: (value: string) => void;
}

const toolbarOptions = [
	[{ header: 1 }, { header: 2 }],
	[{ align: [] }],
	["bold", "italic", "underline"],
	[{ color: [] }, { background: [] }],
	["image"],
];

const TextEditor = ({ className, placeholder, text, onChangeText }: Props) => {
	const modules = {
		toolbar: toolbarOptions,
	};

	const formats = [
		"header",
		"align",
		"bold",
		"italic",
		"underline",
		"color",
		"background",
		"image",
	];

	const handleChange = (value: string) => {
		onChangeText(value);
	};

	return (
		<div className={className}>
			<ReactQuill
				className="w-full h-full pb-4 overflow-y-hidden"
				value={text}
				onChange={handleChange}
				modules={modules}
				formats={formats}
				theme="snow"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default TextEditor;
