import React, { FC } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

type TitleProps = {
	variant?: "large" | "small" | "x-small" | "xx-small";
	shade: "light" | "darker";
	tag?: "h1" | "h2" | "h3" | "span";
};

const Title: FC<TitleProps> = ({ tag = "span", variant, shade, children }) => {
	const Tag = tag;
	const classes = classNames(styles.title, styles[shade], styles[variant]);
	return <Tag className={classes}>{children}</Tag>;
};

export default Title;
