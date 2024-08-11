import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
} as SMTPTransport.Options);

type SendEmailDto = {
	sender: Mail.Address;
	receipient: Mail.Address;
	subject: string;
	message: string;
};

export const sendMail = async (dto: SendEmailDto) => {
	const { sender, receipient, subject, message } = dto;

	return await transporter.sendMail({
		from: sender,
		to: receipient,
		subject: subject,
		html: message,
		text: message,
	});
};
