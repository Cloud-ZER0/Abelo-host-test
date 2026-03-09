"use client";

import React from "react";

import { Button } from "@/modules/shared/components/controls/button";
import { useAction } from "@/modules/shared/hooks/use-action";
import { useUser } from "@/modules/user/context/hooks/use-user";

import { logoutAction } from "../../actions/logout";

export interface LogoutButtonProps {
	className?: string;
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
	const { executeAsync: logout, isPending } = useAction(logoutAction);
	const { clearUser } = useUser();

	const onClick = async () => {
		clearUser();
		await logout({});
	};

	return (
		<Button
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onClick={onClick}
			disabled={isPending}
			className={className}
			variant="secondary"
		>
			Logout
		</Button>
	);
};
