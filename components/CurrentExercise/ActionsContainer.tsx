import React, { FC, useEffect, useState } from "react";
import Button from "../Button";
import WeightsIcon from "../../public/icons/weights.svg";
import DoneIcon from "../../public/icons/done.svg";
import RPEIcon from "../../public/icons/rpe.svg";
import ChevronIcon from "../../public/icons/chevron.svg";
import styles from "./styles.module.scss";
import PreviousResultsButton from "../PreviousResultsButton";
import Drawer from "../Drawer";
import ChangeLoadDrawerContent from "../ChangeLoadDrawerContent";
import { ExcelData } from "@/pages/training/[week]/[day]";
import { Bars, divideWeightForPlates } from "../WeightIndicator/utils";
import { useDataSheet } from "providers/SheetDataProvider";

type ActionsContainerProps = {
	markDone: () => void;
	currentExercise: ExcelData;
};

type WeightUpdater = {
	weight: number;
};

const ActionsContainer: FC<ActionsContainerProps> = ({
	markDone,
	currentExercise,
}) => {
	const [showDrawer, setShowDrawer] = useState({ type: "", open: false });
	const [loadedBar, setLoadedBar] = useState({});

	useEffect(() => {
		setLoadedBar({
			plates: divideWeightForPlates(
				(currentExercise.result &&
					+currentExercise.result?.weight - Bars.Olympic) ||
					0
			),
			weight:
				(currentExercise.result && +currentExercise.result?.weight) ||
				0,
		});
	}, [currentExercise]);

	const { data, updateSheet } = useDataSheet();

	const getCurrentCellId = data.find(
		(item) => item?.result?.cellId === currentExercise.result?.cellId
	)?.result?.cellId;

	return (
		<section className={styles.actionsContainer}>
			<div className={styles.buttons}>
				<Button
					iconLeft={<WeightsIcon />}
					iconRight={<ChevronIcon width={15} height={15} />}
					onClick={() =>
						setShowDrawer({ type: "change-load", open: true })
					}
				>
					Change load
				</Button>
				<Button
					iconLeft={<span className={styles.hashIcon}>#</span>}
					iconRight={<ChevronIcon width={15} height={15} />}
				>
					Change reps
				</Button>
				<Button
					iconLeft={<RPEIcon />}
					iconRight={<ChevronIcon width={15} height={15} />}
				>
					Set RPE
				</Button>
			</div>
			<div className={styles.buttons}>
				<PreviousResultsButton />
				<Button
					variant="smallRound"
					onClick={markDone}
					align="right"
					testId="doneButton"
				>
					<DoneIcon width={33} height={28} />
				</Button>
			</div>
			{showDrawer.open && (
				<Drawer
					onClick={() =>
						updateSheet<WeightUpdater>({
							cell: getCurrentCellId || "",
							weight: loadedBar.weight,
						})
					}
				>
					<ChangeLoadDrawerContent
						currentExercise={currentExercise}
						loadedBar={loadedBar}
						setLoadedBar={setLoadedBar}
					/>
				</Drawer>
			)}
		</section>
	);
};
export default ActionsContainer;
