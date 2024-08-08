import axios, { AxiosResponse } from "axios";
var handlebars = require("handlebars/dist/cjs/handlebars");
import { writingEmailTemplate } from "../interface/emailtemplate/writingEmailTemplate";

export interface WritingEmailInput {
	name: string;
	to: string;
	title: string;
	firstCriterion: string;
	secondCriterion: string;
	thirdCriterion: string;
	fourthCriterion: string;
	score: number;
	remark: string;
}

export const sendWritingEmail = async (input: WritingEmailInput) => {
	const apiEndPoint = "/api/sendmail";

	const htmlBody = complieWritingTemplate(
		input.name,
		input.score,
		input.firstCriterion,
		input.secondCriterion,
		input.thirdCriterion,
		input.fourthCriterion,
		input.remark
	);

	const payload = {
		name: input.name,
		to: input.to,
		subject: input.title,
		message: htmlBody,
	};

	try {
		const response: AxiosResponse = await axios.post(apiEndPoint, payload, {
			withCredentials: true,
			validateStatus: (status) => status >= 200 && status <= 500,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

function complieWritingTemplate(
	name: string,
	score: number,
	firstCriterion: string,
	secondCriterion: string,
	thirdCriterion: string,
	fourthCriterion: string,
	remark: string
) {
	const template = handlebars.compile(writingEmailTemplate);
	const htmlBody = template({
		name: name,
		score: score,
		firstCriterion: firstCriterion,
		secondCriterion: secondCriterion,
		thirdCriterion: thirdCriterion,
		fourthCriterion: fourthCriterion,
		remark: remark,
	});
	return htmlBody;
}
