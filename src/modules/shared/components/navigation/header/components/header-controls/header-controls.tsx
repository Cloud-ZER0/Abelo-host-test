"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { LogoutButton } from "@/modules/auth/components/logout-button";
import { Button } from "@/modules/shared/components/controls/button";
import { useUser } from "@/modules/user/context/hooks/use-user";

import styles from "./header-controls.module.scss";

export interface HeaderControlsProps {
	className?: string;
}

export const HeaderControls = ({ className }: HeaderControlsProps) => {
	const { user } = useUser();
	const router = useRouter();

	const onLogin = () => {
		router.push("/login");
	};

	return (
		<div className={className}>
			{user != undefined ? (
				<div className={styles.info}>
					<p>{`${user.firstName} ${user.lastName}`}</p>
					<LogoutButton />
				</div>
			) : (
				<Button onClick={onLogin}>Login</Button>
			)}
		</div>
	);
};
