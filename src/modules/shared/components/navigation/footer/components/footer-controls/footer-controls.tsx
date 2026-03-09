"use client";

import { clsx } from "clsx";
import React from "react";

import { useUser } from "@/modules/user/context/hooks/use-user";

import styles from "./footer-controls.module.scss";

export interface FooterControlsProps {
	className?: string;
}

const year = new Date().getFullYear();

export const FooterControls = ({ className }: FooterControlsProps) => {
	const { user } = useUser();

	return (
		<div className={clsx(styles.root, className)}>
			<span className={styles.year}>{year}</span>
			{user != undefined && <span className={styles.email}>{user.email}</span>}
		</div>
	);
};
