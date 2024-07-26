import { useRef } from "react";

export default function PopupTagManagement() {
	const popupTagManagementRef = useRef<HTMLDetailsElement>(null);

	return (
		<details
			ref={popupTagManagementRef}
			id="popupTagManagement"
			className="flex justify-center items-center flex-1 fixed">
			<summary className="list-none"></summary>
			<div className="w-104 h-104 bg-white rounded-md shadow-md"></div>
		</details>
	);
}
