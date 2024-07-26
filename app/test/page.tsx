"use client";
import PopupTagManagement from "./components/PopupTagManagement";

export default function Page() {
	const onOpenPopup = () => {
		const popupTagManagement = document.getElementById(
			"popupRecordManagement"
		) as HTMLDetailsElement;
		if (popupTagManagement) {
			popupTagManagement.open = true;
		}
	};

	return (
		<main className="relative flex items-center justify-center flex-1 main">
			<button onClick={() => onOpenPopup()}>Open Tag Management</button>
		</main>
	);
}
