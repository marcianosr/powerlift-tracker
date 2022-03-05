import React, { FC, ReactElement } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

type ButtonProps = {
	iconLeft?: ReactElement;
	iconRight?: ReactElement;
	variant?: "large";
};

const Button: FC<ButtonProps> = ({
	variant,
	iconLeft,
	iconRight,
	children,
}) => {
	return (
		<button
			role="button"
			className={classNames(styles.button, styles[variant])}
		>
			{iconLeft && iconLeft}
			<span className={styles.text}>{children}</span>
			{iconRight && iconRight}
		</button>
	);
};

export default Button;
