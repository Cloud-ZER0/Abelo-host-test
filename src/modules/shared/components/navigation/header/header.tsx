import { Logo } from "../../logo/logo";
import { HeaderControls } from "./components/header-controls";

import styles from "./header.module.scss";

export const Header = () => {
	return (
		<header className={styles.header}>
			<Logo />
			<HeaderControls />
		</header>
	);
};
