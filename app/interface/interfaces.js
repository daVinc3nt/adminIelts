"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Speaking = exports.Writing = exports.Listening = exports.Reading = exports.Skill = exports.QuizType = void 0;
// Quiz Interface
exports.QuizType = {
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    FILLING: 'FILLING'
};
exports.Skill = {
    READING: 'READING',
    LISTENING: 'LISTENING',
    WRITING: 'WRITING',
    SPEAKING: 'SPEAKING'
};
// Record Interface
/**
 * Id là quizId
 * Từ quizId tìm ra bài quiz rồi so khớp answer để tính điểm
 * duration là thời gian làm bài
 */
var Reading = /** @class */ (function () {
    function Reading() {
    }
    return Reading;
}());
exports.Reading = Reading;
var Listening = /** @class */ (function () {
    function Listening() {
    }
    return Listening;
}());
exports.Listening = Listening;
var Writing = /** @class */ (function () {
    function Writing() {
    }
    return Writing;
}());
exports.Writing = Writing;
var Speaking = /** @class */ (function () {
    function Speaking() {
    }
    return Speaking;
}());
exports.Speaking = Speaking;
