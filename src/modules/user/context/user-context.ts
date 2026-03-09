import { createContext } from "react";
import { type StoreApi } from "zustand";

import { createUserStore, type UserStoreOtpions } from "../store/user-store";

export const UserContext =
	createContext<StoreApi<UserStoreOtpions>>(createUserStore());
