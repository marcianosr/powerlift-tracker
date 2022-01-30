import styles from "@/pages/index.module.css";
import { GetServerSideProps } from "next";
import { parse } from "papaparse";
import { useEffect, useState } from "react";
import ExcersiseList from "@/components/ExcersiseList";
import { parseCSV } from "util/parseCSV";

export default function Home({ data }) {
	const dataToLift = data.map(
		([excersise, sets, reps, ...lastTimeLifts]: [
			string,
			string,
			string
		]) => ({
			excersise,
			sets,
			reps,
			lastTimeLifts: {
				lift: lastTimeLifts[lastTimeLifts.length - 1],
				RPE: lastTimeLifts[lastTimeLifts.length - 2],
			},
		})
	);

	const [slideIndex, setSlideIndex] = useState(0);
	const excersiseToShow = dataToLift.slice(slideIndex, slideIndex + 2);
	const [currentExcersise] = excersiseToShow;
	const amountOfSets = +currentExcersise.sets;
	const [setsCounter, setSetsCounter] = useState(amountOfSets);

	const parsedReps = currentExcersise.reps
		.split(/x|<=|\s/)
		.filter((text: string) => text !== "")[0];

	useEffect(() => {
		setSetsCounter(amountOfSets);
	}, [amountOfSets, currentExcersise.excersise]);

	return (
		<section>
			<h1>Lifting dashboard</h1>
			<section>
				<ExcersiseList
					excersises={excersiseToShow}
					reps={parsedReps}
					setsCounter={setsCounter}
				/>
			</section>
			<button
				onClick={() => {
					setsCounter > 1
						? setSetsCounter(setsCounter - 1)
						: setSlideIndex((index) => index + 1);
				}}
			>
				Next
			</button>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const resp = await fetch(
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vQbmSO_PytKWSd2TSuEN2mtxbCDU_DgmPyU-OGBpRNDMMrB1UIWG7E67RVDkKA-fveOPDJZit1P2Jsj/pub?gid=1180621188&single=true&output=csv"
	);

	const text = await resp.text();
	const parsed = parse(text, {
		delimiter: ",",
		// columns: 10,
		// header: true,
		skipEmptyLines: "greedy",
		// preview: 2,
		// newline: "\n",
	})
		.data.flat()
		.filter((f) => f !== "");

	return {
		props: {
			data: parseCSV(parsed as string[]),
		},
	};
};
