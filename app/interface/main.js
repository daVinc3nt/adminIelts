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
exports.RecordOperation = exports.TestOperation = exports.QuizOperation = exports.AccountOperation = exports.AuthOperation = void 0;
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
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/update/").concat(id), payload, {
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
		this.baseUrl = "https://engo.tiendungcorp.com/v1/quizzes";
	}
	QuizOperation.prototype.create = function (payload, token) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function () {
			var response, error_8;
			return __generator(this, function (_c) {
				switch (_c.label) {
					case 0:
						_c.trys.push([0, 2, , 3]);
						return [
							4 /*yield*/,
							axios_1.default.post(
								"".concat(this.baseUrl, "/create"),
								payload,
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_8 = _c.sent();
						console.log(
							"Error searching accounts: ",
							(_a =
								error_8 === null || error_8 === void 0
									? void 0
									: error_8.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_8 === null || error_8 === void 0
								? void 0
								: error_8.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_8 === null || error_8 === void 0
											? void 0
											: error_8.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_8 === null || error_8 === void 0
										? void 0
										: error_8.request,
								status: error_8.response
									? error_8.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
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
						return [
							4 /*yield*/,
							axios_1.default.post(
								"".concat(this.baseUrl, "/search"),
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_9 = _c.sent();
						console.log(
							"Error searching accounts: ",
							(_a =
								error_9 === null || error_9 === void 0
									? void 0
									: error_9.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_9 === null || error_9 === void 0
								? void 0
								: error_9.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_9 === null || error_9 === void 0
											? void 0
											: error_9.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_9 === null || error_9 === void 0
										? void 0
										: error_9.request,
								status: error_9.response
									? error_9.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
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
						return [
							4 /*yield*/,
							axios_1.default.get(
								"".concat(this.baseUrl, "/").concat(id),
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_10 = _c.sent();
						console.log(
							"Error searching accounts: ",
							(_a =
								error_10 === null || error_10 === void 0
									? void 0
									: error_10.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_10 === null || error_10 === void 0
								? void 0
								: error_10.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_10 === null || error_10 === void 0
											? void 0
											: error_10.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_10 === null || error_10 === void 0
										? void 0
										: error_10.request,
								status: error_10.response
									? error_10.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
				}
			});
		});
	};
	QuizOperation.prototype.update = function (id, payload, token) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function () {
			var response, error_11;
			return __generator(this, function (_c) {
				switch (_c.label) {
					case 0:
						_c.trys.push([0, 2, , 3]);
						return [
							4 /*yield*/,
							axios_1.default.put(
								"".concat(this.baseUrl, "/").concat(id),
								payload,
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_11 = _c.sent();
						console.log(
							"Error updating account: ",
							(_a =
								error_11 === null || error_11 === void 0
									? void 0
									: error_11.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_11 === null || error_11 === void 0
								? void 0
								: error_11.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_11 === null || error_11 === void 0
											? void 0
											: error_11.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_11 === null || error_11 === void 0
										? void 0
										: error_11.request,
								status: error_11.response
									? error_11.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
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
						return [
							4 /*yield*/,
							axios_1.default.delete(
								"".concat(this.baseUrl, "/").concat(id),
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_12 = _c.sent();
						console.log(
							"Error updating account: ",
							(_a =
								error_12 === null || error_12 === void 0
									? void 0
									: error_12.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_12 === null || error_12 === void 0
								? void 0
								: error_12.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_12 === null || error_12 === void 0
											? void 0
											: error_12.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_12 === null || error_12 === void 0
										? void 0
										: error_12.request,
								status: error_12.response
									? error_12.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
				}
			});
		});
	};
	return QuizOperation;
})();
exports.QuizOperation = QuizOperation;
var TestOperation = /** @class */ (function () {
	function TestOperation() {
		this.baseUrl = "https://engo.tiendungcorp.com/v1/tests";
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
							formData.append("file", payload.files[i]);
						}
						formData.append("data", JSON.stringify(payload.data));
						return [
							4 /*yield*/,
							axios_1.default.post(
								"".concat(this.baseUrl, "/create"),
								formData,
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _b.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_13 = _b.sent();
						console.error(
							"Request that caused the error: ",
							error_13 === null || error_13 === void 0
								? void 0
								: error_13.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_a =
										error_13 === null || error_13 === void 0
											? void 0
											: error_13.response) === null ||
									_a === void 0
										? void 0
										: _a.data,
								request:
									error_13 === null || error_13 === void 0
										? void 0
										: error_13.request,
								status: error_13.response
									? error_13.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
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
						return [
							4 /*yield*/,
							axios_1.default.post(
								"".concat(
									this.baseUrl,
									"/create_from_quiz_ids"
								),
								payload,
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_14 = _c.sent();
						console.log(
							"Error searching accounts: ",
							(_a =
								error_14 === null || error_14 === void 0
									? void 0
									: error_14.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_14 === null || error_14 === void 0
								? void 0
								: error_14.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_14 === null || error_14 === void 0
											? void 0
											: error_14.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_14 === null || error_14 === void 0
										? void 0
										: error_14.request,
								status: error_14.response
									? error_14.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
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
						return [
							4 /*yield*/,
							axios_1.default.post(
								""
									.concat(this.baseUrl, "/search?option=")
									.concat(option, "&skill=")
									.concat(skill),
								payload,
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_15 = _c.sent();
						console.log(
							"Error searching accounts: ",
							(_a =
								error_15 === null || error_15 === void 0
									? void 0
									: error_15.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_15 === null || error_15 === void 0
								? void 0
								: error_15.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_15 === null || error_15 === void 0
											? void 0
											: error_15.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_15 === null || error_15 === void 0
										? void 0
										: error_15.request,
								status: error_15.response
									? error_15.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
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
						return [
							4 /*yield*/,
							axios_1.default.get(
								"".concat(this.baseUrl, "/").concat(id),
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_16 = _c.sent();
						console.log(
							"Error searching accounts: ",
							(_a =
								error_16 === null || error_16 === void 0
									? void 0
									: error_16.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_16 === null || error_16 === void 0
								? void 0
								: error_16.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_16 === null || error_16 === void 0
											? void 0
											: error_16.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_16 === null || error_16 === void 0
										? void 0
										: error_16.request,
								status: error_16.response
									? error_16.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
				}
			});
		});
	};
	TestOperation.prototype.update = function (id, payload, token) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function () {
			var response, error_17;
			return __generator(this, function (_c) {
				switch (_c.label) {
					case 0:
						_c.trys.push([0, 2, , 3]);
						return [
							4 /*yield*/,
							axios_1.default.put(
								"".concat(this.baseUrl, "/update/").concat(id),
								payload,
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_17 = _c.sent();
						console.log(
							"Error updating account: ",
							(_a =
								error_17 === null || error_17 === void 0
									? void 0
									: error_17.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_17 === null || error_17 === void 0
								? void 0
								: error_17.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_17 === null || error_17 === void 0
											? void 0
											: error_17.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_17 === null || error_17 === void 0
										? void 0
										: error_17.request,
								status: error_17.response
									? error_17.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
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
						return [
							4 /*yield*/,
							axios_1.default.delete(
								"".concat(this.baseUrl, "/").concat(id),
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_18 = _c.sent();
						console.log(
							"Error updating account: ",
							(_a =
								error_18 === null || error_18 === void 0
									? void 0
									: error_18.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_18 === null || error_18 === void 0
								? void 0
								: error_18.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_18 === null || error_18 === void 0
											? void 0
											: error_18.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_18 === null || error_18 === void 0
										? void 0
										: error_18.request,
								status: error_18.response
									? error_18.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
				}
			});
		});
	};
	return TestOperation;
})();
exports.TestOperation = TestOperation;
var RecordOperation = /** @class */ (function () {
	function RecordOperation() {
		this.baseUrl = "https://engo.tiendungcorp.com/v1/records";
	}
	// async create(payload: CreateRecord, token: string) {
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
	RecordOperation.prototype.init = function (payload, token) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function () {
			var response, error_19;
			return __generator(this, function (_c) {
				switch (_c.label) {
					case 0:
						_c.trys.push([0, 2, , 3]);
						return [
							4 /*yield*/,
							axios_1.default.post(
								"".concat(this.baseUrl, "/init"),
								payload,
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_19 = _c.sent();
						console.log(
							"Error searching accounts: ",
							(_a =
								error_19 === null || error_19 === void 0
									? void 0
									: error_19.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_19 === null || error_19 === void 0
								? void 0
								: error_19.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_19 === null || error_19 === void 0
											? void 0
											: error_19.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_19 === null || error_19 === void 0
										? void 0
										: error_19.request,
								status: error_19.response
									? error_19.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
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
						return [
							4 /*yield*/,
							axios_1.default.post(
								"".concat(this.baseUrl, "/search"),
								payload,
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_20 = _c.sent();
						console.log(
							"Error searching accounts: ",
							(_a =
								error_20 === null || error_20 === void 0
									? void 0
									: error_20.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_20 === null || error_20 === void 0
								? void 0
								: error_20.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_20 === null || error_20 === void 0
											? void 0
											: error_20.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_20 === null || error_20 === void 0
										? void 0
										: error_20.request,
								status: error_20.response
									? error_20.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
				}
			});
		});
	};
	RecordOperation.prototype.update = function (id, payload, token) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function () {
			var response, error_21;
			return __generator(this, function (_c) {
				switch (_c.label) {
					case 0:
						_c.trys.push([0, 2, , 3]);
						return [
							4 /*yield*/,
							axios_1.default.put(
								"".concat(this.baseUrl, "/").concat(id),
								payload,
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_21 = _c.sent();
						console.log(
							"Error updating account: ",
							(_a =
								error_21 === null || error_21 === void 0
									? void 0
									: error_21.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_21 === null || error_21 === void 0
								? void 0
								: error_21.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_21 === null || error_21 === void 0
											? void 0
											: error_21.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_21 === null || error_21 === void 0
										? void 0
										: error_21.request,
								status: error_21.response
									? error_21.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
				}
			});
		});
	};
	RecordOperation.prototype.delete = function (id, token) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function () {
			var response, error_22;
			return __generator(this, function (_c) {
				switch (_c.label) {
					case 0:
						_c.trys.push([0, 2, , 3]);
						return [
							4 /*yield*/,
							axios_1.default.delete(
								"".concat(this.baseUrl, "/").concat(id),
								{
									withCredentials: true,
									validateStatus: function (status) {
										return status >= 200 && status <= 500;
									},
									headers: {
										Authorization: "Bearer ".concat(token),
									},
								}
							),
						];
					case 1:
						response = _c.sent();
						return [
							2 /*return*/,
							{
								success: response.data.success,
								message: response.data.message,
								data: response.data.data,
							},
						];
					case 2:
						error_22 = _c.sent();
						console.log(
							"Error updating account: ",
							(_a =
								error_22 === null || error_22 === void 0
									? void 0
									: error_22.response) === null ||
								_a === void 0
								? void 0
								: _a.data
						);
						console.error(
							"Request that caused the error: ",
							error_22 === null || error_22 === void 0
								? void 0
								: error_22.request
						);
						return [
							2 /*return*/,
							{
								success:
									(_b =
										error_22 === null || error_22 === void 0
											? void 0
											: error_22.response) === null ||
									_b === void 0
										? void 0
										: _b.data,
								request:
									error_22 === null || error_22 === void 0
										? void 0
										: error_22.request,
								status: error_22.response
									? error_22.response.status
									: null,
							},
						];
					case 3:
						return [2 /*return*/];
				}
			});
		});
	};
	return RecordOperation;
})();
exports.RecordOperation = RecordOperation;