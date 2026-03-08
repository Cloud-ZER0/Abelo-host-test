// lib/axios.ts
import axios from "axios";

import { config } from ".";

// Типы для ответов API
export interface ApiResponse<T = unknown> {
	data: T;
	message?: string;
	status: number;
}

export interface ApiError {
	message: string;
	errors?: Record<string, string[]>;
	status: number;
}

// class AxiosClient {
// 	private instance;

// 	public constructor() {
// 		this.instance = axios.create({
// 			baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
// 			timeout: 10_000,
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});

// 		const test = axios.create({
// 			baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
// 			timeout: 10_000,
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});

// 		test.interceptors.request.use

// 		this.setupInterceptors();
// 	}

// 	private setupInterceptors() {
// 		// Request interceptor
// 		this.instance.interceptors.request.use(
// 			(config) => {
// 				// Добавляем токен авторизации
// 				const token = localStorage.getItem("accessToken");
// 				if (token) {
// 					config.headers.Authorization = `Bearer ${token}`;
// 				}

// 				// Логирование в dev режиме
// 				if (process.env.NODE_ENV === "development") {
// 					console.log(
// 						`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`,
// 						config,
// 					);
// 				}

// 				return config;
// 			},
// 			(error) => {
// 				return Promise.reject(error);
// 			},
// 		);

// 		// Response interceptor
// 		this.instance.interceptors.response.use(
// 			(response) => {
// 				// Логирование в dev режиме
// 				if (process.env.NODE_ENV === "development") {
// 					console.log(
// 						`✅ [API] ${response.config.method?.toUpperCase()} ${response.config.url}`,
// 						response.data,
// 					);
// 				}
// 				return response;
// 			},
// 			async (error: AxiosError) => {
// 				const originalRequest = error.config;

// 				// Логирование ошибок
// 				if (process.env.NODE_ENV === "development") {
// 					console.error(
// 						`❌ [API] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
// 						error.response?.data || error.message,
// 					);
// 				}

// 				// Обработка 401 ошибки (не авторизован)
// 				if (error.response?.status === 401 && originalRequest) {
// 					try {
// 						const refreshToken = localStorage.getItem("refreshToken");
// 						if (refreshToken) {
// 							const response = await this.refreshTokens(refreshToken);
// 							localStorage.setItem("accessToken", response.data.accessToken);

// 							// Повторяем оригинальный запрос с новым токеном
// 							originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
// 							return this.instance(originalRequest);
// 						}
// 					} catch (refreshError) {
// 						// Если не удалось обновить токен - разлогиниваем
// 						localStorage.removeItem("accessToken");
// 						localStorage.removeItem("refreshToken");
// 						window.location.href = "/login";
// 					}
// 				}

// 				return Promise.reject(this.normalizeError(error));
// 			},
// 		);
// 	}

// 	private normalizeError(error: AxiosError): ApiError {
// 		if (error.response) {
// 			// Сервер вернул ошибку
// 			return {
// 				message: (error.response.data as any)?.message || "Произошла ошибка",
// 				errors: (error.response.data as any)?.errors,
// 				status: error.response.status,
// 			};
// 		} else if (error.request) {
// 			// Запрос был сделан, но ответа нет
// 			return {
// 				message: "Сервер не отвечает",
// 				status: 503,
// 			};
// 		} else {
// 			// Что-то пошло не так при настройке запроса
// 			return {
// 				message: error.message || "Неизвестная ошибка",
// 				status: 500,
// 			};
// 		}
// 	}

// 	private async refreshTokens(refreshToken: string) {
// 		return this.instance.post("/auth/refresh", { refreshToken });
// 	}

// 	// Методы для запросов
// 	async get<T = any>(
// 		url: string,
// 		config?: AxiosRequestConfig,
// 	): Promise<ApiResponse<T>> {
// 		const response = await this.instance.get<T>(url, config);
// 		return {
// 			data: response.data,
// 			status: response.status,
// 		};
// 	}

// 	async post<T = any>(
// 		url: string,
// 		data?: any,
// 		config?: AxiosRequestConfig,
// 	): Promise<ApiResponse<T>> {
// 		const response = await this.instance.post<T>(url, data, config);
// 		return {
// 			data: response.data,
// 			status: response.status,
// 		};
// 	}

// 	async put<T = any>(
// 		url: string,
// 		data?: any,
// 		config?: AxiosRequestConfig,
// 	): Promise<ApiResponse<T>> {
// 		const response = await this.instance.put<T>(url, data, config);
// 		return {
// 			data: response.data,
// 			status: response.status,
// 		};
// 	}

// 	async delete<T = any>(
// 		url: string,
// 		config?: AxiosRequestConfig,
// 	): Promise<ApiResponse<T>> {
// 		const response = await this.instance.delete<T>(url, config);
// 		return {
// 			data: response.data,
// 			status: response.status,
// 		};
// 	}
// }

export const axiosClinet = axios.create({
	baseURL: config.backendUrl,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// axiosClinet.interceptors.request.use(
// 	(config) => {
// 		// Добавляем токен авторизации

// 		const token = localStorage.getItem("accessToken");
// 		if (token != undefined && config.headers != undefined) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 			config.withCredentials = true;
// 		}

// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(new Error(error as string));
// 	},
// );
