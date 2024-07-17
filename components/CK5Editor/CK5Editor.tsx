"use client";
import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";


import {
	ClassicEditor,
	AccessibilityHelp,
	Alignment,
	Autoformat,
	AutoImage,
	Autosave,
	Base64UploadAdapter,
	BlockToolbar,
	Bold,
	Essentials,
	GeneralHtmlSupport,
	Heading,
	HtmlComment,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Italic,
	Paragraph,
	SelectAll,
	ShowBlocks,
	SourceEditing,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const themes = {
	light: "/light-theme.css",
	dark: "/dark-theme.css",
};

interface Props {
	content: string;
	onChangeContent: (content: string) => void;
}

export default function CK5Editor({ content, onChangeContent }: Props) {
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
				"sourceEditing",
				"showBlocks",
				"selectAll",
				"|",
				"heading",
				"|",
				"bold",
				"italic",
				"|",
				"insertImage",
				"insertTable",
				"|",
				"alignment",
				"|",
				"accessibilityHelp",
			],
		},
		plugins: [
			AccessibilityHelp,
			Alignment,
			Autoformat,
			AutoImage,
			Autosave,
			Base64UploadAdapter,
			BlockToolbar,
			Bold,
			Essentials,
			GeneralHtmlSupport,
			Heading,
			HtmlComment,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Italic,
			Paragraph,
			SelectAll,
			ShowBlocks,
			SourceEditing,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			TextTransformation,
			Undo,
		],
		blockToolbar: [
			"heading",
			"|",
			"bold",
			"italic",
			"|",
			"insertImage",
			"insertTable",
			"|",
			"alignment",
		],
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
			],
		},
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true,
				},
			],
		},
		image: {
			toolbar: [
				"toggleImageCaption",
				"imageTextAlternative",
				"|",
				"imageStyle:inline",
				"imageStyle:wrapText",
				"imageStyle:breakText",
				"|",
				"resizeImage",
			],
		},
		placeholder: "Type or paste your content here!",
		table: {
			contentToolbar: [
				"tableColumn",
				"tableRow",
				"mergeTableCells",
				"tableProperties",
				"tableCellProperties",
			],
		},
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
