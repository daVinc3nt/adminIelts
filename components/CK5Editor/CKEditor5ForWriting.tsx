"use client";
import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
	ClassicEditor,
	AccessibilityHelp,
	Alignment,
	Autosave,
	BlockToolbar,
	Bold,
	Essentials,
	Heading,
	Highlight,
	HorizontalLine,
	Italic,
	Paragraph,
	SelectAll,
	Strikethrough,
	Underline,
	Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import "ckeditor5/ckeditor5.css";
import { useTheme } from "next-themes";

const themes = {
	light: "/light-theme.css",
	dark: "/dark-theme.css",
};

interface Props {
	content: string;
	onChangeContent: (content: string) => void;
	disable?: boolean;
}

export default function CKEditor5ForWriting({
	content,
	onChangeContent,
	disable,
}: Props) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	const { theme } = useTheme(); // Extract the theme using useTheme

	useEffect(() => {
		// Dynamically import the CSS file based on the theme
		if (!theme) return;
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = themes[theme] || themes.light;
		document.head.appendChild(link);

		// Cleanup function to remove the link element when the component unmounts or theme changes
		return () => {
			document.head.removeChild(link);
		};
	}, [theme]);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = {
		toolbar: {
			items: [
				"undo",
				"redo",
				"|",
				"selectAll",
				"|",
				"heading",
				"|",
				"bold",
				"italic",
				"underline",
				"strikethrough",
				"|",
				"horizontalLine",
				"highlight",
				"|",
				"alignment",
				"|",
				"accessibilityHelp",
			],
			shouldNotGroupWhenFull: false,
		},
		plugins: [
			AccessibilityHelp,
			Alignment,
			Autosave,
			BlockToolbar,
			Bold,
			Essentials,
			Heading,
			Highlight,
			HorizontalLine,
			Italic,
			Paragraph,
			SelectAll,
			Strikethrough,
			Underline,
			Undo,
		],
		blockToolbar: ["bold", "italic"],
		heading: {
			options: [
				{
					model: "paragraph",
					title: "Paragraph",
					class: "ck-heading_paragraph",
				},
				{
					model: "heading1",
					view: "h1",
					title: "Heading 1",
					class: "ck-heading_heading1",
				},
				{
					model: "heading2",
					view: "h2",
					title: "Heading 2",
					class: "ck-heading_heading2",
				},
				{
					model: "heading3",
					view: "h3",
					title: "Heading 3",
					class: "ck-heading_heading3",
				},
				{
					model: "heading4",
					view: "h4",
					title: "Heading 4",
					class: "ck-heading_heading4",
				},
				{
					model: "heading5",
					view: "h5",
					title: "Heading 5",
					class: "ck-heading_heading5",
				},
				{
					model: "heading6",
					view: "h6",
					title: "Heading 6",
					class: "ck-heading_heading6",
				},
			],
		},
		initialData: "",
		placeholder: "Type or paste your content here!",
	};

	return (
		<div className="main-container">
			<div
				className="editor-container editor-container_classic-editor editor-container_include-block-toolbar"
				ref={editorContainerRef}>
				<div className="editor-container__editor">
					<div ref={editorRef}>
						{isLayoutReady && (
							<CKEditor
								disabled={disable}
								editor={ClassicEditor}
								config={editorConfig as any}
								data={content}
								onChange={(_, editor) => {
									onChangeContent(editor.getData());
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
