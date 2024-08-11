"use client";
import { FormEvent, useEffect, useState } from "react";
import { FaRegTrashCan, FaXmark } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { motion } from "framer-motion";
import { useFlashcardManagement } from "../provider/FlashcardManagementProvider";
import TextArea from "@/components/TextArea/TextArea";
import { FTag } from "@/app/interface/tag/tag";
import { FaPlus } from "react-icons/fa";
import { FlashCardToCreateFlashCard } from "@/app/interface/flashcard/flashcard";
import { CreateFullFlashCard } from "@/app/lib/interfaces";
import { HiHashtag } from "react-icons/hi2";
import { useClickOutsideDetails } from "@/hooks/useClickOutsideDetails";
import { useUtility } from "@/app/provider/UtilityProvider";

export default function PopupUpdateFlashcard() {
	const { onSetConfirmation } = useUtility();

	const {
		currentFlashcard,
		updateFlashcard,
		onChangeIsOpenUpdateFlashcard,
		onSelectFlashcard,
		getImagePath,
		fTagList,
		createFtag,
		deleteFtag,
	} = useFlashcardManagement();
	const [images, setImages] = useState<File>(null);
	const [directUrl, setDirectUrl] = useState<string>("");
	const [ftagValue, setFtagValue] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");

	useEffect(() => {
		if (images) {
			const url = URL.createObjectURL(images);
			setDirectUrl(url);
		} else {
			const filePath = currentFlashcard.filePath;
			getImagePath(filePath).then((url) => {
				setDirectUrl(url);
			});
		}
	}, [currentFlashcard, images]);

	const onChangeWord = (word: string) => {
		onSelectFlashcard({ ...currentFlashcard, word });
	};

	const onChangeDefinition = (definition: string) => {
		onSelectFlashcard({ ...currentFlashcard, definition });
	};

	const close = () => {
		onChangeIsOpenUpdateFlashcard(false);
		setImages(null);
		setDirectUrl("");
		setSearchValue("");
		setFtagValue("");
	};

	const onChangeImage = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			setImages(file);
		}
	};

	const update = (e: FormEvent) => {
		e.preventDefault();
		const createFullFlashCard: CreateFullFlashCard = {
			file: images,
			data: FlashCardToCreateFlashCard(currentFlashcard),
		};
		updateFlashcard(createFullFlashCard, currentFlashcard.id);
	};

	const onSelectTag = (tag: FTag) => {
		const tags = [...currentFlashcard.tags];
		const index = tags.findIndex((t) => t.id === tag.id);
		if (index === -1) {
			tags.push(tag);
		} else {
			tags.splice(index, 1);
		}
		onSelectFlashcard({ ...currentFlashcard, tags });
	};

	const onCreateFtag = () => {
		createFtag(ftagValue);
		setFtagValue("");
	};

	const onDeleteTag = (tag: FTag) => {
		const del = () => {
			deleteFtag(tag.id);
		};
		onSetConfirmation({
			message: `Do you want to delete tag ${tag.value}?`,
			onConfirm: del,
			type: "delete",
		});
	};

	const tagListRef = useClickOutsideDetails();
	const addTagRef = useClickOutsideDetails();

	return (
		<div className="fixed z-30 flex justify-center w-full h-full pt-10 bg-black bg-opacity-10 dark:bg-opacity-30">
			<motion.form
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 30,
					stiffness: 500,
				}}
				onSubmit={update}
				className="flex flex-col items-stretch w-5/12 gap-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-pot-black h-5/6">
				<div className="flex flex-row items-center justify-between w-full px-4 py-3 h-fit bg-foreground-blue dark:bg-foreground-red">
					<h1 className="text-3xl font-bold text-white dark:text-gray-200">
						Update flashcard
					</h1>

					<FaXmark
						onClick={() => close()}
						className="text-white size-8 dark:text-gray-200"
					/>
				</div>

				<div className="flex flex-col flex-1 gap-2 pb-10 overflow-y-scroll scrollbar-hide">
					<div className="flex flex-row flex-wrap w-2/3 px-4 pt-2">
						<input
							value={currentFlashcard.word}
							onChange={(e) => onChangeWord(e.target.value)}
							type="text"
							required
							autoComplete="off"
							placeholder="Enter flashcard word"
							className="flex-1 px-2 py-1 text-2xl font-bold text-black bg-gray-100 rounded-md dark:bg-gray-22 focus:outline-none focus:ring-0 dark:text-gray-200"
						/>
					</div>
					<div className="flex flex-row flex-wrap w-full gap-2 px-4 py-2">
						<details ref={tagListRef} className="relative">
							<summary className="list-none">
								<div className="px-3 py-[6px] rounded-md bg-foreground-blue dark:bg-foreground-red text-white dark:text-gray-200 font-bold flex items-center justify-center flex-row gap-2 text-sm cursor-pointer">
									Add tags
									<FaPlus className="size-3" />
								</div>
							</summary>
							<div className="absolute flex flex-col gap-2 p-2 bg-white border rounded-md shadow-md w-128 min-h-44 h-fit dark:bg-black-night top-10 dark:border-black-night dark:shadow-lg">
								<div className="flex flex-row items-start justify-between w-full gap-2 h-fit">
									<input
										type="text"
										autoComplete="off"
										value={searchValue}
										onChange={(e) =>
											setSearchValue(e.target.value)
										}
										placeholder="Search tag"
										className="w-1/2 p-2 text-sm text-black bg-gray-100 rounded-md dark:bg-gray-22 focus:outline-none focus:ring-0 dark:text-gray-200"
									/>
									<details
										ref={addTagRef}
										className="relative">
										<summary className="list-none">
											<div className="flex flex-row items-center gap-1 px-2 py-1 text-sm text-white rounded-md cursor-pointer w-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
												Create tag
												<FaPlus className="size-4" />
											</div>
										</summary>
										<div className="absolute right-0 flex flex-row items-center justify-between w-64 p-1 bg-white border rounded-md shadow-md h-fit dark:bg-gray-22 dark:border-pot-black dark:shadow-lg top-9">
											<input
												type="text"
												value={ftagValue}
												onChange={(e) =>
													setFtagValue(e.target.value)
												}
												autoComplete="off"
												placeholder="Tag name"
												className="w-full px-2 py-1 text-sm font-bold text-black bg-white rounded-md dark:bg-gray-22 focus:outline-none focus:ring-0 dark:text-gray-200"
											/>
											<div
												onClick={onCreateFtag}
												className="flex flex-row items-center gap-1 px-2 py-1 text-sm text-black rounded-md cursor-pointer w-fit hover:bg-foreground-blue dark:hover:bg-foreground-red hover:text-white dark:text-gray-200">
												Create
											</div>
										</div>
									</details>
								</div>
								<div className="flex flex-row flex-wrap w-full gap-2 pt-4 bg-white rounded-md h-fit dark:bg-black-night">
									{fTagList.map((tag, index) => {
										if (
											currentFlashcard.tags.find(
												(t) => t.id === tag.id
											)
										) {
											return null;
										}

										if (
											searchValue &&
											!tag.value
												.toUpperCase()
												.includes(
													searchValue.toUpperCase()
												)
										) {
											return null;
										}

										return (
											<div
												onClick={() => onSelectTag(tag)}
												key={tag.id + index}
												className="flex flex-row items-center justify-between gap-0 px-2 py-1 bg-gray-100 rounded-md cursor-pointer w-fit h-fit dark:bg-gray-22 group min-h-8">
												<HiHashtag className="size-4" />
												{tag.value}
												<FaRegTrashCan
													onClick={(e) => {
														e.stopPropagation();
														onDeleteTag(tag);
													}}
													className="ml-1 text-transparent size-4 group-hover:text-red-500"
												/>
											</div>
										);
									})}
								</div>
							</div>
						</details>
						{currentFlashcard.tags.map((tag, index) => {
							return (
								<div
									key={tag.id + index}
									className="flex flex-row items-center justify-between gap-0 px-2 py-1 bg-gray-100 rounded-md cursor-pointer w-fit h-fit dark:bg-gray-22 group min-h-8">
									<HiHashtag className="size-4" />
									<span className="font-medium">
										{tag.value}
									</span>
									<FaXmark
										onClick={() => onSelectTag(tag)}
										className="ml-1 text-transparent size-4 group-hover:text-red-500"
									/>
								</div>
							);
						})}
					</div>
					<div className="flex flex-row flex-wrap w-full gap-2 px-4 mt-8">
						{directUrl && (
							<img
								src={directUrl}
								alt="flashcard image"
								className="object-contain w-full max-h-80"
							/>
						)}
						<input
							type="file"
							onChange={onChangeImage}
							accept="image/png, image/jpg, image/jpeg"
							className="w-1/2 px-2 py-1 text-black bg-gray-100 rounded-md dark:bg-gray-22 focus:outline-none focus:ring-0 dark:text-gray-200 file:border-0 file:bg-gray-100 dark:file:bg-gray-22 file:focus:outline-none file:focus:ring-0 file:text-black dark:file:text-gray-200"
						/>
					</div>
					<div className="flex flex-row flex-wrap w-full gap-2 px-4 py-2">
						<TextArea
							value={currentFlashcard.definition}
							onChangeInput={onChangeDefinition}
							required
							autoComplete="off"
							placeholder="Enter flashcard defeinition"
							className="flex-1 text-black bg-gray-100 border-0 outline-none dark:text-gray-200 ring-0 dark:bg-gray-22 focus:border-0 focus:ring-0 focus:outline-none dark:focus:border-0 dark:focus:ring-0 duration-0 min-h-32"
						/>
					</div>
				</div>
				<div className="flex flex-row items-center justify-between w-full p-4 pt-2">
					<button
						onClick={() => close()}
						type="button"
						className="flex flex-row items-center justify-between gap-1 px-2 py-1 font-bold text-black rounded-md w-fit h-fit bg-mecury-gray dark:bg-gray-22 dark:text-gray-200">
						Cancel
						<FcCancel className="size-4" />
					</button>
					<button
						type="submit"
						className="flex flex-row items-center justify-between gap-1 px-2 py-1 font-bold text-white rounded-md w-fit h-fit bg-foreground-blue dark:bg-foreground-red dark:text-gray-200">
						Update
					</button>
				</div>
			</motion.form>
		</div>
	);
}
