import { CreateFlashCard, UpdateFlashCard } from "@/app/lib/interfaces";

export interface Flashcard {
	id?: string;
	accountID?: string;
	word: string;
	definition: string;
	isPublic?: boolean;
	filePath?: string;
	createdAt?: string;
	updatedAt?: string;
	tags?: any[];
}

export const FlashCardToCreateFlashCard = (
	flashcard: Flashcard
): CreateFlashCard => {
	const { word, definition, tags } = flashcard;
	return {
		word,
		definition,
		isPublic: true,
		tagIds: tags.map((tag) => tag.id),
	};
};

export const FlashCardToUpdateFlashCard = (
	flashcard: Flashcard
): UpdateFlashCard => {
	const { word, definition, isPublic } = flashcard;
	return {
		word,
		definition,
		isPublic,
	};
};
