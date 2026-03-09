import { clsx } from "clsx";
import React from "react";

import styles from "./logo.module.scss";

export interface LogoProps {
	className?: string;
}

export const Logo = ({ className }: LogoProps) => {
	return <div className={clsx(styles.root, className)}>Logo</div>;
};
