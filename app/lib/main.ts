import axios, { AxiosResponse } from "axios";
import { CreateFlashCard, CreateFullQuiz, CreateFullTest, CreateTag, CreateTestFromQuizIds, FetchingType, GetRecord, InitRecord, LoginPayload, SearchPayload, SignUpPayload, Skill, UpdateAccountPayload, UpdateAvatarPayload, UpdateFlashCard, UpdateFullQuiz, UpdateFullTest, UpdateQuiz, UpdateRecord, UpdateRecordConfig, UpdateTag, VerifyOtpPayload } from "./interfaces";
import { UUID } from "crypto";

export class AuthOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/auth';
    }

    public async signup(payload: SignUpPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/signup`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error signing up: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async login(payload: LoginPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/login`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error logging in: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async verifyOtp(payload: VerifyOtpPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/otp/verify`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error verifying otp: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class AccountOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/accounts';
    }

    async search(payload: SearchPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async update(id: UUID, payload: UpdateAccountPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/update/${id}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async updateAvatar(id: UUID, payload: UpdateAvatarPayload, token: string) {
        try {
            const formData = new FormData();
            formData.append('avatar', payload.avatar);

			const response: AxiosResponse = await axios.post(`${this.baseUrl}/avatar/update/${id}`, formData, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    // will return image url in data
    async getAvatar(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/avatar/get/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error getting avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class QuizOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/quizzes';
    }

    async create(payload: CreateFullQuiz, token: string) {
        try {       
			
			const formData = new FormData();
            formData.append('file', payload.file);
            formData.append('data', JSON.stringify(payload.data));
			
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, formData, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
		
			return { success: response.data.success, message: response.data.message, data: response.data.data };
	
		} catch (error: any) {
			console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		} 
    }

    //get all quizzes
    async search(token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async findOne(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async update(id: UUID, payload: UpdateFullQuiz, token: string) {
        try {       
			
			const formData = new FormData();
            formData.append('file', payload.file);
            formData.append('data', JSON.stringify(payload.data));
			
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, formData, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
		
			return { success: response.data.success, message: response.data.message, data: response.data.data };
	
		} catch (error: any) {
			console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		} 
    }

    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class TestOperation {
    private baseUrl: string;

    constructor() {
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

    async createFullTest(payload: CreateFullTest, token: string) {
        try {       
			
			const formData = new FormData();
            for (let i = 0; i < payload.files.length; i++) {
                formData.append('file', payload.files[i]);
            }

            formData.append('data', JSON.stringify(payload.data));
			
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, formData, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
		
			return { success: response.data.success, message: response.data.message, data: response.data.data };
	
		} catch (error: any) {
			console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		} 
    }

    async createFromQuizIds(payload: CreateTestFromQuizIds, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/create_from_quiz_ids`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    //get custome tests
    async search(option: FetchingType, skill: Skill, payload: SearchPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/search?option=${option}&skill=${skill}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async findOne(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async update(id: UUID, payload: UpdateFullTest, token: string) {
        try {       
			
			const formData = new FormData();
            for (let i = 0; i < payload.files.length; i++) {
                formData.append('file', payload.files[i]);
            }

            formData.append('data', JSON.stringify(payload.data));
			
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, formData, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
		
			return { success: response.data.success, message: response.data.message, data: response.data.data };
	
		} catch (error: any) {
			console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		} 
    }

    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class RecordOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/records';
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

    async init(payload: InitRecord, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/init`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }


    async search(payload: GetRecord,token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }


    async update(id: UUID, payload: UpdateRecord, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async updateConfig(id: UUID, payload: UpdateRecordConfig, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/config/update/${id}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}


export class TagOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/tags';
    }

    async create(payload: CreateTag, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    //get all tags
    async search(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/search`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }


    async update(id: UUID, payload: UpdateTag, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class PracticeOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/practices';
    }

    //get search by tag id
    async search(tagId: UUID, page: string, size: string, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/search?tagId=${tagId}&page=${page}&size=${size}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

}

// flash card

export class FlashCardOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/flashcards';
    }

    async create(payload: CreateFlashCard, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    
    async search(payload: SearchPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }


    async update(id: UUID, payload: UpdateFlashCard, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return { success: response.data.success, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

}