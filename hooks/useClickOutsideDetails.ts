"use client";
import { useEffect, useRef } from "react";

export const useClickOutsideDetails = () => {
	const detailsRef = useRef<HTMLDetailsElement>();
	useEffect(() => {
		if (detailsRef.current) {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					detailsRef.current &&
					!detailsRef.current.contains(event.target as Node)
				) {
					detailsRef.current.open = false;
				}
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [detailsRef]);

	return detailsRef;
};
