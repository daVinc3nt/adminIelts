"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchingType =
	exports.Category =
	exports.Skill =
	exports.QuizType =
	exports.InvitationStatus =
		void 0;
var InvitationStatus;
(function (InvitationStatus) {
	InvitationStatus["PENDING"] = "Ch\u01B0a ph\u1EA3n h\u1ED3i";
	InvitationStatus["ACCEPT"] = "Ch\u1EA5p nh\u1EADn";
	InvitationStatus["DECLINE"] = "T\u1EEB ch\u1ED1i";
})(InvitationStatus || (exports.InvitationStatus = InvitationStatus = {}));
// Quiz Interface
var QuizType;
(function (QuizType) {
    QuizType["MULTIPLE_CHOICE"] = "MULTIPLE CHOICE";
	QuizType["FILLING"] = "FILLING";
})(QuizType || (exports.QuizType = QuizType = {}));
var Skill;
(function (Skill) {
    Skill["READING"] = "READING";
	Skill["LISTENING"] = "LISTENING";
	Skill["WRITING"] = "WRITING";
	Skill["SPEAKING"] = "SPEAKING";
})(Skill || (exports.Skill = Skill = {}));
;
var Category;
(function (Category) {
    Category["THPTQG"] = "THPTQG";
	Category["IELTS"] = "IELTS";
	Category["HSK"] = "HSK";
})(Category || (exports.Category = Category = {}));
var FetchingType;
(function (FetchingType) {
	FetchingType["FULL"] = "full";
	FetchingType["AUTO"] = "auto";
})(FetchingType || (exports.FetchingType = FetchingType = {}));