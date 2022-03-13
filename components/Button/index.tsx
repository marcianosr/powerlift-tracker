import React, { FC, ReactElement } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

type ButtonProps = {
	iconLeft?: ReactElement;
	iconRight?: ReactElement;
	variant?: "large" | "smallRound";
	align?: "left" | "right";
	onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
	variant,
	iconLeft,
	iconRight,
	onClick,
	align = "left",
	children,
}) => {
	return (
		<button
			onClick={onClick}
			role="button"
			className={classNames(styles.button, styles[variant], {
				[styles.alignRight]: align === "right",
			})}
		>
			{iconLeft && iconLeft}
			<span className={styles.text}>{children}</span>
			{iconRight && iconRight}
		</button>
	);
};

export default Button;
