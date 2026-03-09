import React from "react";

import { LoginForm } from "../../components/login-form";

import styles from "./login-page.module.scss";

export const LoginPage = () => {
	return (
		<main className={styles.root}>
			<LoginForm />
		</main>
	);
};
