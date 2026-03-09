"use client";

import { useState, type PropsWithChildren } from "react";
import { type StoreApi } from "zustand";

import {
	createUserStore,
	type User,
	type UserStoreOtpions,
} from "../../store/user-store";
import { UserContext } from "../user-context";

export interface UserProviderProps {
	user?: User;
}

export const UserProvider = ({
	children,
	user,
}: PropsWithChildren<UserProviderProps>) => {
	const [state] = useState<StoreApi<UserStoreOtpions>>(() =>
		createUserStore(user),
	);

	return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
