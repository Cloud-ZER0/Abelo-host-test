import { createStore, type StoreApi } from "zustand";

export interface User {
	firstName: string;
	lastName: string;
	email: string;
}

export interface UserStoreOtpions {
	isAuthorized: boolean;
	user?: User;
	setUser: (user: User) => void;
	clearUser: () => void;
}

export const createUserStore = (user?: User): StoreApi<UserStoreOtpions> => {
	return createStore<UserStoreOtpions>((set) => ({
		isAuthorized: user != undefined ? true : false,
		user: user,
		setUser: (user) => {
			set({ user: user, isAuthorized: true });
		},
		clearUser: () => {
			set({ user: undefined, isAuthorized: false });
		},
	}));
};
