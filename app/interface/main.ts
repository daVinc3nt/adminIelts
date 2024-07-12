import axios, { AxiosResponse } from "axios";
import { LoginPayload, SearchPayload, SignUpPayload, UpdateAccountPayload, UpdateAvatarPayload, VerifyOtpPayload } from "./interfaces";
import { UUID } from "crypto";
import FormData from "form-data"

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
			
			return { error: response.data.error, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error signing up: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async login(payload: LoginPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/login`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return { error: response.data.error, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error logging in: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async verifyOtp(payload: VerifyOtpPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/otp/verify`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return { error: response.data.error, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error verifying otp: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class AccountOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://engo.tiendungcorp.com/v1/v1/account';
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
			
			return { error: response.data.error, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
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
			
			return { error: response.data.error, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
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
			
			return { error: response.data.error, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error updating avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
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
			
			return { error: response.data.error, message: response.data.message, data: response.data.data };
		} 
		catch (error: any) {
			console.log("Error getting avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}