import styles from "@/pages/index.module.css";
import { GetServerSideProps, NextPage } from "next";
import { parse } from "papaparse";
import { parseCSV } from "util/parseCSV";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import ExcersiseListItem from "@/components/ExcersiseListItem";
import { ExceriseInfoItems } from "@/components/ExcersiseInfoItem/types";

type TrainingPageProps = {
	data: any;
};

const TrainingPage: NextPage<TrainingPageProps> = ({ data }) => {
	const { query } = useRouter();

	const excersisesInfo: ExceriseInfoItems[] = data.map(
		([excersise, sets, reps, ...previous]: [
			string,
			string,
			string,
			string
		]) => ({
			excersise,
			sets,
			reps,
			weight: previous[previous.length - 2],
			RPE: previous[previous.length - 1],
			previous: {
				weight: previous[previous.length - 4],
				RPE: previous[previous.length - 3],
			},
		})
	);

	return (
		<Layout>
			<h1>{query.day}</h1>
			{excersisesInfo.map((item, idx) => (
				<ExcersiseListItem item={item} idx={idx} key={idx} />
			))}
		</Layout>
	);
};

type SlugKeys = "dag-a" | "dag-b" | "dag-c" | "dag-d";
type SlugValues = "dayA" | "dayB" | "dayC" | "dayD";
type SlugMappingTypes = {
	[key in SlugKeys]: SlugValues;
};

const DAY_KEYS_BY_ROUTE_MAPPING: SlugMappingTypes = {
	["dag-a"]: "dayA",
	["dag-b"]: "dayB",
	["dag-c"]: "dayC",
	["dag-d"]: "dayD",
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const resp = await fetch(
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vQbmSO_PytKWSd2TSuEN2mtxbCDU_DgmPyU-OGBpRNDMMrB1UIWG7E67RVDkKA-fveOPDJZit1P2Jsj/pub?gid=1180621188&single=true&output=csv"
	);

	const dayQuery = params?.day as SlugKeys;
	const slug = DAY_KEYS_BY_ROUTE_MAPPING[dayQuery];

	const text = await resp.text();
	const parsed = parse(text, {
		delimiter: ",",
		skipEmptyLines: "greedy",
	})
		.data.flat()
		.filter((f) => f !== "");

	return {
		props: {
			data: parseCSV(parsed as string[])[slug],
		},
	};
};

export default TrainingPage;
