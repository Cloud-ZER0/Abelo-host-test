import { useContext } from "react";
import { useStore } from "zustand";

import { UserContext } from "../user-context";

export const useUser = () => {
	const userStore = useContext(UserContext);

	return useStore(userStore);
};
