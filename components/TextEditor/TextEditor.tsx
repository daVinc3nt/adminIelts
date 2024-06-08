"use client";
import React from "react";
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
		<div className="w-full h-full overflow-y-hidden border-2 border-red-400 rounded-lg pb-4">
			<style
				dangerouslySetInnerHTML={{
					__html: `
					.ql-container .ql-editor {
						height: calc(100% - 42px); /* 42px is the default height of the toolbar */
						overflow-y: scroll;
					}
					.ql-container,
					.ql-toolbar,
					.ql-editor {
						border: none !important;
					}
					.ql-toolbar {
						position: sticky;
						top: 0;
						z-index: 1;
						background-color: white;
						border-bottom: 2px solid #f87171 !important;
					}
			`,
				}}
			/>
			<ReactQuill
				className="w-full h-full overflow-y-hidden"
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
