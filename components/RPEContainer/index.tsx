import classNames from "classnames";
import React, { FC } from "react";
import styles from "./styles.module.scss";

type RPEContainerProps = {
	RPE?: string;
};

const RPE_MAPPING: RPEMappingTypes = {
	"< 6": "blue",
	"6": "greenBlue",
	"6.5": "green",
	"7": "yellowGreen",
	"7.5": "yellow",
	"8": "orangeYellow",
	"8.5": "orange",
	"9": "redOrange",
	"9.5": "red",
	"10": "purple",
};

type RPEColors =
	| "blue"
	| "greenBlue"
	| "green"
	| "yellowGreen"
	| "yellow"
	| "orangeYellow"
	| "orange"
	| "redOrange"
	| "red"
	| "purple";

type RPEMappingTypes = {
	[key: string]: RPEColors;
};

const RPEContainer: FC<RPEContainerProps> = ({ RPE }) => {
	return (
		<div className={styles.container}>
			<span>@</span>
			{!RPE && (
				<div
					data-testid="empty-rpe"
					className={classNames(
						styles.RPEContainer,
						styles.emptyRPEContainer
					)}
				></div>
			)}
			{RPE && (
				<div
					className={classNames(
						styles.RPEContainer,
						styles[RPE_MAPPING[RPE]]
					)}
				>
					{RPE}
				</div>
			)}
		</div>
	);
};

export default RPEContainer;
