"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemarkRequestOperation = exports.UploadOperation = exports.FlashCardOperation = exports.PracticeOperation = exports.FTagOperation = exports.TagOperation = exports.RecordOperation = exports.TestOperation = exports.QuizOperation = exports.AccountOperation = exports.AuthOperation = void 0;
var axios_1 = require("axios");
var FormData = require("form-data");
var AuthOperation = /** @class */ (function () {
    function AuthOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/auth';
    }
    AuthOperation.prototype.signup = function (payload) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/signup"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_1 = _c.sent();
                        console.log("Error signing up: ", (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_1 === null || error_1 === void 0 ? void 0 : error_1.request);
                        return [2 /*return*/, { success: (_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data, request: error_1 === null || error_1 === void 0 ? void 0 : error_1.request, status: error_1.response ? error_1.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthOperation.prototype.login = function (payload) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/login"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_2 = _c.sent();
                        console.log("Error logging in: ", (_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_2 === null || error_2 === void 0 ? void 0 : error_2.request);
                        return [2 /*return*/, { success: (_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _b === void 0 ? void 0 : _b.data, request: error_2 === null || error_2 === void 0 ? void 0 : error_2.request, status: error_2.response ? error_2.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthOperation.prototype.verifyOtp = function (payload) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/otp/verify"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_3 = _c.sent();
                        console.log("Error verifying otp: ", (_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_3 === null || error_3 === void 0 ? void 0 : error_3.request);
                        return [2 /*return*/, { success: (_b = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _b === void 0 ? void 0 : _b.data, request: error_3 === null || error_3 === void 0 ? void 0 : error_3.request, status: error_3.response ? error_3.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthOperation;
}());
exports.AuthOperation = AuthOperation;
var AccountOperation = /** @class */ (function () {
    function AccountOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/accounts';
    }
    AccountOperation.prototype.search = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_4 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_4 === null || error_4 === void 0 ? void 0 : error_4.request);
                        return [2 /*return*/, { success: (_b = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _b === void 0 ? void 0 : _b.data, request: error_4 === null || error_4 === void 0 ? void 0 : error_4.request, status: error_4.response ? error_4.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountOperation.prototype.update = function (id, payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_5 = _c.sent();
                        console.log("Error updating account: ", (_a = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_5 === null || error_5 === void 0 ? void 0 : error_5.request);
                        return [2 /*return*/, { success: (_b = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _b === void 0 ? void 0 : _b.data, request: error_5 === null || error_5 === void 0 ? void 0 : error_5.request, status: error_5.response ? error_5.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountOperation.prototype.updateAvatar = function (id, payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('avatar', payload.avatar);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/avatar/update/").concat(id), formData, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_6 = _c.sent();
                        console.log("Error updating avatar: ", (_a = error_6 === null || error_6 === void 0 ? void 0 : error_6.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_6 === null || error_6 === void 0 ? void 0 : error_6.request);
                        return [2 /*return*/, { success: (_b = error_6 === null || error_6 === void 0 ? void 0 : error_6.response) === null || _b === void 0 ? void 0 : _b.data, request: error_6 === null || error_6 === void 0 ? void 0 : error_6.request, status: error_6.response ? error_6.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // will return image url in data
    AccountOperation.prototype.getAvatar = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/avatar/get/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_7 = _c.sent();
                        console.log("Error getting avatar: ", (_a = error_7 === null || error_7 === void 0 ? void 0 : error_7.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_7 === null || error_7 === void 0 ? void 0 : error_7.request);
                        return [2 /*return*/, { success: (_b = error_7 === null || error_7 === void 0 ? void 0 : error_7.response) === null || _b === void 0 ? void 0 : _b.data, request: error_7 === null || error_7 === void 0 ? void 0 : error_7.request, status: error_7.response ? error_7.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AccountOperation;
}());
exports.AccountOperation = AccountOperation;
var QuizOperation = /** @class */ (function () {
    function QuizOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/quizzes';
    }
    QuizOperation.prototype.create = function (payload, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('file', payload.file);
                        formData.append('data', JSON.stringify(payload.data));
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), formData, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_8 = _b.sent();
                        console.error("Request that caused the error: ", error_8 === null || error_8 === void 0 ? void 0 : error_8.request);
                        return [2 /*return*/, { success: (_a = error_8 === null || error_8 === void 0 ? void 0 : error_8.response) === null || _a === void 0 ? void 0 : _a.data, request: error_8 === null || error_8 === void 0 ? void 0 : error_8.request, status: error_8.response ? error_8.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get all quizzes
    QuizOperation.prototype.search = function (token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_9;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_9 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_9 === null || error_9 === void 0 ? void 0 : error_9.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_9 === null || error_9 === void 0 ? void 0 : error_9.request);
                        return [2 /*return*/, { success: (_b = error_9 === null || error_9 === void 0 ? void 0 : error_9.response) === null || _b === void 0 ? void 0 : _b.data, request: error_9 === null || error_9 === void 0 ? void 0 : error_9.request, status: error_9.response ? error_9.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    QuizOperation.prototype.findOne = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_10 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_10 === null || error_10 === void 0 ? void 0 : error_10.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_10 === null || error_10 === void 0 ? void 0 : error_10.request);
                        return [2 /*return*/, { success: (_b = error_10 === null || error_10 === void 0 ? void 0 : error_10.response) === null || _b === void 0 ? void 0 : _b.data, request: error_10 === null || error_10 === void 0 ? void 0 : error_10.request, status: error_10.response ? error_10.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    QuizOperation.prototype.update = function (id, payload, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('file', payload.file);
                        formData.append('data', JSON.stringify(payload.data));
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), formData, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_11 = _b.sent();
                        console.error("Request that caused the error: ", error_11 === null || error_11 === void 0 ? void 0 : error_11.request);
                        return [2 /*return*/, { success: (_a = error_11 === null || error_11 === void 0 ? void 0 : error_11.response) === null || _a === void 0 ? void 0 : _a.data, request: error_11 === null || error_11 === void 0 ? void 0 : error_11.request, status: error_11.response ? error_11.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    QuizOperation.prototype.delete = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_12 = _c.sent();
                        console.log("Error updating account: ", (_a = error_12 === null || error_12 === void 0 ? void 0 : error_12.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_12 === null || error_12 === void 0 ? void 0 : error_12.request);
                        return [2 /*return*/, { success: (_b = error_12 === null || error_12 === void 0 ? void 0 : error_12.response) === null || _b === void 0 ? void 0 : _b.data, request: error_12 === null || error_12 === void 0 ? void 0 : error_12.request, status: error_12.response ? error_12.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return QuizOperation;
}());
exports.QuizOperation = QuizOperation;
var TestOperation = /** @class */ (function () {
    function TestOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/tests';
    }
    // async create(payload: CreateTest, token: string) {
    //     try {
    // 		const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
    // 			withCredentials: true,
    //             validateStatus: status => status >= 200 && status <= 500,
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             },
    // 		});
    // 		return { success: response.data.success, message: response.data.message, data: response.data.data };
    // 	} 
    // 	catch (error: any) {
    // 		console.log("Error searching accounts: ", error?.response?.data);
    //         console.error("Request that caused the error: ", error?.request);
    //         return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
    // 	}
    // }
    TestOperation.prototype.createFullTest = function (payload, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, response, error_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        for (i = 0; i < payload.files.length; i++) {
                            formData.append('file', payload.files[i]);
                        }
                        formData.append('data', JSON.stringify(payload.data));
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), formData, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_13 = _b.sent();
                        console.error("Request that caused the error: ", error_13 === null || error_13 === void 0 ? void 0 : error_13.request);
                        return [2 /*return*/, { success: (_a = error_13 === null || error_13 === void 0 ? void 0 : error_13.response) === null || _a === void 0 ? void 0 : _a.data, request: error_13 === null || error_13 === void 0 ? void 0 : error_13.request, status: error_13.response ? error_13.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TestOperation.prototype.createFromQuizIds = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_14;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create_from_quiz_ids"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_14 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_14 === null || error_14 === void 0 ? void 0 : error_14.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_14 === null || error_14 === void 0 ? void 0 : error_14.request);
                        return [2 /*return*/, { success: (_b = error_14 === null || error_14 === void 0 ? void 0 : error_14.response) === null || _b === void 0 ? void 0 : _b.data, request: error_14 === null || error_14 === void 0 ? void 0 : error_14.request, status: error_14.response ? error_14.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get custome tests
    TestOperation.prototype.search = function (option, skill, payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_15;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search?option=").concat(option, "&skill=").concat(skill), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_15 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_15 === null || error_15 === void 0 ? void 0 : error_15.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_15 === null || error_15 === void 0 ? void 0 : error_15.request);
                        return [2 /*return*/, { success: (_b = error_15 === null || error_15 === void 0 ? void 0 : error_15.response) === null || _b === void 0 ? void 0 : _b.data, request: error_15 === null || error_15 === void 0 ? void 0 : error_15.request, status: error_15.response ? error_15.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TestOperation.prototype.findOne = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_16;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_16 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_16 === null || error_16 === void 0 ? void 0 : error_16.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_16 === null || error_16 === void 0 ? void 0 : error_16.request);
                        return [2 /*return*/, { success: (_b = error_16 === null || error_16 === void 0 ? void 0 : error_16.response) === null || _b === void 0 ? void 0 : _b.data, request: error_16 === null || error_16 === void 0 ? void 0 : error_16.request, status: error_16.response ? error_16.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TestOperation.prototype.update = function (id, payload, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, response, error_17;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        for (i = 0; i < payload.files.length; i++) {
                            formData.append('file', payload.files[i]);
                        }
                        formData.append('data', JSON.stringify(payload.data));
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), formData, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_17 = _b.sent();
                        console.error("Request that caused the error: ", error_17 === null || error_17 === void 0 ? void 0 : error_17.request);
                        return [2 /*return*/, { success: (_a = error_17 === null || error_17 === void 0 ? void 0 : error_17.response) === null || _a === void 0 ? void 0 : _a.data, request: error_17 === null || error_17 === void 0 ? void 0 : error_17.request, status: error_17.response ? error_17.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TestOperation.prototype.delete = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_18;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_18 = _c.sent();
                        console.log("Error updating account: ", (_a = error_18 === null || error_18 === void 0 ? void 0 : error_18.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_18 === null || error_18 === void 0 ? void 0 : error_18.request);
                        return [2 /*return*/, { success: (_b = error_18 === null || error_18 === void 0 ? void 0 : error_18.response) === null || _b === void 0 ? void 0 : _b.data, request: error_18 === null || error_18 === void 0 ? void 0 : error_18.request, status: error_18.response ? error_18.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TestOperation;
}());
exports.TestOperation = TestOperation;
var RecordOperation = /** @class */ (function () {
    function RecordOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/records';
    }
    RecordOperation.prototype.init = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_19;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/init"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_19 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_19 === null || error_19 === void 0 ? void 0 : error_19.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_19 === null || error_19 === void 0 ? void 0 : error_19.request);
                        return [2 /*return*/, { success: (_b = error_19 === null || error_19 === void 0 ? void 0 : error_19.response) === null || _b === void 0 ? void 0 : _b.data, request: error_19 === null || error_19 === void 0 ? void 0 : error_19.request, status: error_19.response ? error_19.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecordOperation.prototype.search = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_20;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_20 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_20 === null || error_20 === void 0 ? void 0 : error_20.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_20 === null || error_20 === void 0 ? void 0 : error_20.request);
                        return [2 /*return*/, { success: (_b = error_20 === null || error_20 === void 0 ? void 0 : error_20.response) === null || _b === void 0 ? void 0 : _b.data, request: error_20 === null || error_20 === void 0 ? void 0 : error_20.request, status: error_20.response ? error_20.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecordOperation.prototype.findOne = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_21;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/search/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_21 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_21 === null || error_21 === void 0 ? void 0 : error_21.request);
                        return [2 /*return*/, { success: (_b = error_21 === null || error_21 === void 0 ? void 0 : error_21.response) === null || _b === void 0 ? void 0 : _b.data, request: error_21 === null || error_21 === void 0 ? void 0 : error_21.request, status: error_21.response ? error_21.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecordOperation.prototype.update = function (id, payload, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, i, response, error_22;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        for (i = 0; i < payload.writingFiles.length; i++) {
                            formData.append('writingFile', payload.writingFiles[i]);
                        }
                        for (i = 0; i < payload.speakingFiles.length; i++) {
                            formData.append('speakingFile', payload.speakingFiles[i]);
                        }
                        formData.append('data', JSON.stringify(payload.data));
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), formData, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_22 = _b.sent();
                        console.error("Request that caused the error: ", error_22 === null || error_22 === void 0 ? void 0 : error_22.request);
                        return [2 /*return*/, { success: (_a = error_22 === null || error_22 === void 0 ? void 0 : error_22.response) === null || _a === void 0 ? void 0 : _a.data, request: error_22 === null || error_22 === void 0 ? void 0 : error_22.request, status: error_22.response ? error_22.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecordOperation.prototype.updateConfig = function (id, payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_23;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/config/update/").concat(id), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_23 = _c.sent();
                        console.log("Error updating account: ", (_a = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_23 === null || error_23 === void 0 ? void 0 : error_23.request);
                        return [2 /*return*/, { success: (_b = error_23 === null || error_23 === void 0 ? void 0 : error_23.response) === null || _b === void 0 ? void 0 : _b.data, request: error_23 === null || error_23 === void 0 ? void 0 : error_23.request, status: error_23.response ? error_23.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecordOperation.prototype.delete = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_24;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_24 = _c.sent();
                        console.log("Error updating account: ", (_a = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_24 === null || error_24 === void 0 ? void 0 : error_24.request);
                        return [2 /*return*/, { success: (_b = error_24 === null || error_24 === void 0 ? void 0 : error_24.response) === null || _b === void 0 ? void 0 : _b.data, request: error_24 === null || error_24 === void 0 ? void 0 : error_24.request, status: error_24.response ? error_24.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecordOperation.prototype.getTestStat = function (testId, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_25;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/stat/").concat(testId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_25 = _c.sent();
                        console.log("Error updating account: ", (_a = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_25 === null || error_25 === void 0 ? void 0 : error_25.request);
                        return [2 /*return*/, { success: (_b = error_25 === null || error_25 === void 0 ? void 0 : error_25.response) === null || _b === void 0 ? void 0 : _b.data, request: error_25 === null || error_25 === void 0 ? void 0 : error_25.request, status: error_25.response ? error_25.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecordOperation.prototype.getWritingAnswer = function (writingAnswerId, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_26;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/writing/answer/").concat(writingAnswerId), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_26 = _c.sent();
                        console.log("Error updating account: ", (_a = error_26 === null || error_26 === void 0 ? void 0 : error_26.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_26 === null || error_26 === void 0 ? void 0 : error_26.request);
                        return [2 /*return*/, { success: (_b = error_26 === null || error_26 === void 0 ? void 0 : error_26.response) === null || _b === void 0 ? void 0 : _b.data, request: error_26 === null || error_26 === void 0 ? void 0 : error_26.request, status: error_26.response ? error_26.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecordOperation.prototype.createWritingRemark = function (writingAnswerId, payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_27;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/writing/remark/").concat(writingAnswerId), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_27 = _c.sent();
                        console.log("Error updating account: ", (_a = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_27 === null || error_27 === void 0 ? void 0 : error_27.request);
                        return [2 /*return*/, { success: (_b = error_27 === null || error_27 === void 0 ? void 0 : error_27.response) === null || _b === void 0 ? void 0 : _b.data, request: error_27 === null || error_27 === void 0 ? void 0 : error_27.request, status: error_27.response ? error_27.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RecordOperation;
}());
exports.RecordOperation = RecordOperation;
var TagOperation = /** @class */ (function () {
    function TagOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/tags';
    }
    TagOperation.prototype.create = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_28;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_28 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_28 === null || error_28 === void 0 ? void 0 : error_28.request);
                        return [2 /*return*/, { success: (_b = error_28 === null || error_28 === void 0 ? void 0 : error_28.response) === null || _b === void 0 ? void 0 : _b.data, request: error_28 === null || error_28 === void 0 ? void 0 : error_28.request, status: error_28.response ? error_28.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get tags
    TagOperation.prototype.search = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_29;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_29 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_29 === null || error_29 === void 0 ? void 0 : error_29.request);
                        return [2 /*return*/, { success: (_b = error_29 === null || error_29 === void 0 ? void 0 : error_29.response) === null || _b === void 0 ? void 0 : _b.data, request: error_29 === null || error_29 === void 0 ? void 0 : error_29.request, status: error_29.response ? error_29.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TagOperation.prototype.update = function (id, payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_30;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_30 = _c.sent();
                        console.log("Error updating account: ", (_a = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_30 === null || error_30 === void 0 ? void 0 : error_30.request);
                        return [2 /*return*/, { success: (_b = error_30 === null || error_30 === void 0 ? void 0 : error_30.response) === null || _b === void 0 ? void 0 : _b.data, request: error_30 === null || error_30 === void 0 ? void 0 : error_30.request, status: error_30.response ? error_30.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TagOperation.prototype.delete = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_31;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_31 = _c.sent();
                        console.log("Error updating account: ", (_a = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_31 === null || error_31 === void 0 ? void 0 : error_31.request);
                        return [2 /*return*/, { success: (_b = error_31 === null || error_31 === void 0 ? void 0 : error_31.response) === null || _b === void 0 ? void 0 : _b.data, request: error_31 === null || error_31 === void 0 ? void 0 : error_31.request, status: error_31.response ? error_31.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TagOperation;
}());
exports.TagOperation = TagOperation;
var FTagOperation = /** @class */ (function () {
    function FTagOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/ftags';
    }
    FTagOperation.prototype.create = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_32;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_32 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_32 === null || error_32 === void 0 ? void 0 : error_32.request);
                        return [2 /*return*/, { success: (_b = error_32 === null || error_32 === void 0 ? void 0 : error_32.response) === null || _b === void 0 ? void 0 : _b.data, request: error_32 === null || error_32 === void 0 ? void 0 : error_32.request, status: error_32.response ? error_32.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get ftags
    FTagOperation.prototype.search = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_33;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_33 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_33 === null || error_33 === void 0 ? void 0 : error_33.request);
                        return [2 /*return*/, { success: (_b = error_33 === null || error_33 === void 0 ? void 0 : error_33.response) === null || _b === void 0 ? void 0 : _b.data, request: error_33 === null || error_33 === void 0 ? void 0 : error_33.request, status: error_33.response ? error_33.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FTagOperation.prototype.update = function (id, payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_34;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_34 = _c.sent();
                        console.log("Error updating account: ", (_a = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_34 === null || error_34 === void 0 ? void 0 : error_34.request);
                        return [2 /*return*/, { success: (_b = error_34 === null || error_34 === void 0 ? void 0 : error_34.response) === null || _b === void 0 ? void 0 : _b.data, request: error_34 === null || error_34 === void 0 ? void 0 : error_34.request, status: error_34.response ? error_34.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FTagOperation.prototype.delete = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_35;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_35 = _c.sent();
                        console.log("Error updating account: ", (_a = error_35 === null || error_35 === void 0 ? void 0 : error_35.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_35 === null || error_35 === void 0 ? void 0 : error_35.request);
                        return [2 /*return*/, { success: (_b = error_35 === null || error_35 === void 0 ? void 0 : error_35.response) === null || _b === void 0 ? void 0 : _b.data, request: error_35 === null || error_35 === void 0 ? void 0 : error_35.request, status: error_35.response ? error_35.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FTagOperation;
}());
exports.FTagOperation = FTagOperation;
var PracticeOperation = /** @class */ (function () {
    function PracticeOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/practices';
    }
    PracticeOperation.prototype.create = function (payload, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, response, error_36;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        for (i = 0; i < payload.files.length; i++) {
                            formData.append('file', payload.files[i]);
                        }
                        formData.append('data', JSON.stringify(payload.data));
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), formData, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_36 = _b.sent();
                        console.error("Request that caused the error: ", error_36 === null || error_36 === void 0 ? void 0 : error_36.request);
                        return [2 /*return*/, { success: (_a = error_36 === null || error_36 === void 0 ? void 0 : error_36.response) === null || _a === void 0 ? void 0 : _a.data, request: error_36 === null || error_36 === void 0 ? void 0 : error_36.request, status: error_36.response ? error_36.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get search by tag id
    PracticeOperation.prototype.search = function (tagId, page, size, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_37;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/search?tagId=").concat(tagId, "&page=").concat(page, "&size=").concat(size), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_37 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_37 === null || error_37 === void 0 ? void 0 : error_37.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_37 === null || error_37 === void 0 ? void 0 : error_37.request);
                        return [2 /*return*/, { success: (_b = error_37 === null || error_37 === void 0 ? void 0 : error_37.response) === null || _b === void 0 ? void 0 : _b.data, request: error_37 === null || error_37 === void 0 ? void 0 : error_37.request, status: error_37.response ? error_37.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PracticeOperation;
}());
exports.PracticeOperation = PracticeOperation;
// flash card
var FlashCardOperation = /** @class */ (function () {
    function FlashCardOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/flashcards';
    }
    FlashCardOperation.prototype.create = function (payload, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_38;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("file", payload.file);
                        formData.append('data', JSON.stringify(payload.data));
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), formData, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_38 = _b.sent();
                        console.error("Request that caused the error: ", error_38 === null || error_38 === void 0 ? void 0 : error_38.request);
                        return [2 /*return*/, { success: (_a = error_38 === null || error_38 === void 0 ? void 0 : error_38.response) === null || _a === void 0 ? void 0 : _a.data, request: error_38 === null || error_38 === void 0 ? void 0 : error_38.request, status: error_38.response ? error_38.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FlashCardOperation.prototype.search = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_39;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_39 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_39 === null || error_39 === void 0 ? void 0 : error_39.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_39 === null || error_39 === void 0 ? void 0 : error_39.request);
                        return [2 /*return*/, { success: (_b = error_39 === null || error_39 === void 0 ? void 0 : error_39.response) === null || _b === void 0 ? void 0 : _b.data, request: error_39 === null || error_39 === void 0 ? void 0 : error_39.request, status: error_39.response ? error_39.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FlashCardOperation.prototype.update = function (id, payload, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_40;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append("file", payload.file);
                        formData.append('data', JSON.stringify(payload.data));
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update/").concat(id), formData, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_40 = _b.sent();
                        console.error("Request that caused the error: ", error_40 === null || error_40 === void 0 ? void 0 : error_40.request);
                        return [2 /*return*/, { success: (_a = error_40 === null || error_40 === void 0 ? void 0 : error_40.response) === null || _a === void 0 ? void 0 : _a.data, request: error_40 === null || error_40 === void 0 ? void 0 : error_40.request, status: error_40.response ? error_40.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FlashCardOperation.prototype.delete = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_41;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_41 = _c.sent();
                        console.log("Error updating account: ", (_a = error_41 === null || error_41 === void 0 ? void 0 : error_41.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_41 === null || error_41 === void 0 ? void 0 : error_41.request);
                        return [2 /*return*/, { success: (_b = error_41 === null || error_41 === void 0 ? void 0 : error_41.response) === null || _b === void 0 ? void 0 : _b.data, request: error_41 === null || error_41 === void 0 ? void 0 : error_41.request, status: error_41.response ? error_41.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FlashCardOperation;
}());
exports.FlashCardOperation = FlashCardOperation;
// upload
var UploadOperation = /** @class */ (function () {
    function UploadOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/upload';
    }
    UploadOperation.prototype.search = function (filepath, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_42;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "?path=").concat(filepath), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_42 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_42 === null || error_42 === void 0 ? void 0 : error_42.request);
                        return [2 /*return*/, { success: (_b = error_42 === null || error_42 === void 0 ? void 0 : error_42.response) === null || _b === void 0 ? void 0 : _b.data, request: error_42 === null || error_42 === void 0 ? void 0 : error_42.request, status: error_42.response ? error_42.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UploadOperation;
}());
exports.UploadOperation = UploadOperation;
// remark request
var RemarkRequestOperation = /** @class */ (function () {
    function RemarkRequestOperation() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/remark_requests';
    }
    RemarkRequestOperation.prototype.search = function (payload, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_43;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), payload, {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_43 = _c.sent();
                        console.log("Error searching accounts: ", (_a = error_43 === null || error_43 === void 0 ? void 0 : error_43.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_43 === null || error_43 === void 0 ? void 0 : error_43.request);
                        return [2 /*return*/, { success: (_b = error_43 === null || error_43 === void 0 ? void 0 : error_43.response) === null || _b === void 0 ? void 0 : _b.data, request: error_43 === null || error_43 === void 0 ? void 0 : error_43.request, status: error_43.response ? error_43.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RemarkRequestOperation.prototype.delete = function (id, token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_44;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete/").concat(id), {
                                withCredentials: true,
                                validateStatus: function (status) { return status >= 200 && status <= 500; },
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                    case 2:
                        error_44 = _c.sent();
                        console.log("Error updating account: ", (_a = error_44 === null || error_44 === void 0 ? void 0 : error_44.response) === null || _a === void 0 ? void 0 : _a.data);
                        console.error("Request that caused the error: ", error_44 === null || error_44 === void 0 ? void 0 : error_44.request);
                        return [2 /*return*/, { success: (_b = error_44 === null || error_44 === void 0 ? void 0 : error_44.response) === null || _b === void 0 ? void 0 : _b.data, request: error_44 === null || error_44 === void 0 ? void 0 : error_44.request, status: error_44.response ? error_44.response.status : null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RemarkRequestOperation;
}());
exports.RemarkRequestOperation = RemarkRequestOperation;