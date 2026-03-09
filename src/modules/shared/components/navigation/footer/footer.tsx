import React from "react";

import { Logo } from "../../logo/logo";
import { FooterControls } from "./components/footer-controls";

import styles from "./footer.module.scss";

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Logo />
			<FooterControls />
		</footer>
	);
};
