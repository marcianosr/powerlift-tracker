import React, { FC } from "react";
import styles from "./styles.module.scss";

type CardProps = {};

const Card: FC<CardProps> = ({ children }) => {
	return <article className={styles.card}>{children}</article>;
};

export default Card;
