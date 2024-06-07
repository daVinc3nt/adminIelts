export interface TestInfor {
	testName: string;
	testType:
		| "Reading Test"
		| "Listening Test"
		| "Speaking Test"
		| "Writing Test";
	author: string;
	dateCreated: string;
	lastModified: string;
	description: string;
}
