import styles from "@/pages/index.module.css";
import { GetServerSideProps } from "next";
import { parse } from "papaparse";
import ExcersiseList, { WeightRPE } from "@/components/ExcersiseList";
import { parseCSV } from "util/parseCSV";
import Layout from "@/components/Layout";

type ExceriseInfoItems = {
	excersise: string;
	sets: string;
	reps: string;
	previousLifts: WeightRPE;
};

export default function Home({ data }) {
	const dataToLift: ExceriseInfoItems = data.map(
		([excersise, sets, reps, ...previousLifts]: [
			string,
			string,
			string,
			string
		]) => ({
			excersise,
			sets,
			reps,
			currentLifts: {
				weight: previousLifts[previousLifts.length - 2],
				RPE: previousLifts[previousLifts.length - 1],
			},
			previousLifts: {
				weight: previousLifts[previousLifts.length - 3],
				RPE: previousLifts[previousLifts.length - 4],
			},
		})
	);

	console.log(data);

	return (
		<Layout>
			<section>
				<h1>Lifting dashboard</h1>
				<section>
					<ExcersiseList dataToLift={dataToLift} />
				</section>
			</section>
		</Layout>
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
