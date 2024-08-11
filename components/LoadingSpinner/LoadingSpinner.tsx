interface LoadingSpinnerProps {
	size?: number;
}

export default function LoadingSpinner({ size }: LoadingSpinnerProps) {
	const defaultsize = size || 4;
	return (
		<div
			style={{ width: `${defaultsize}rem`, height: `${defaultsize}rem` }}
			className="bg-transparent border-4 border-black border-t-transparent dark:border-gray-200 dark:border-t-transparent animate-spin rounded-full"
		/>
	);
}
