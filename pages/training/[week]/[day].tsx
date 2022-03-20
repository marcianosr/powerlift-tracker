import styles from "@/pages/index.module.css";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { getBasicProgramInfo, loadColumnDataByLetter } from "../../../util";
import CurrentExercise from "@/components/CurrentExercise";
import Header from "@/components/Header";

export type ExcelData = {
	id: string;
	exercise: string;
	day: DayValues;
	reps: string;
	sets: number;
	type: "barbell" | "machine" | "dumbell" | "no-type";
	plan: Plan;
};

type Plan = {
	id: string;
	day: DayValues;
	weight: number | string;
	unit: string;
	reps: string[];
	RPE: string;
} | null;

type TrainingPageProps = {
	data: ExcelData[];
};

const TrainingPage: NextPage<TrainingPageProps> = ({ data }) => {
	const { query } = useRouter();

	const noTrainingPrescription = data.filter((item) => item.plan && []);

	return (
		<Layout>
			<Header pageTitle={query.day} />
			{noTrainingPrescription.length === 0 ? (
				<h1>No prescribed weights yet.</h1>
			) : (
				<CurrentExercise data={data} />
			)}
		</Layout>
	);
};

type SlugKeys = "dag-a" | "dag-b" | "dag-c" | "dag-d";
type DayValues = "A" | "B" | "C" | "D";
type SlugMappingTypes = {
	[key in SlugKeys]: DayValues;
};

const DAY_KEYS_BY_ROUTE_MAPPING: SlugMappingTypes = {
	["dag-a"]: "A",
	["dag-b"]: "B",
	["dag-c"]: "C",
	["dag-d"]: "D",
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const creds = require("../../../powerlift-339515-4c4a82b74db1.json"); // the file saved above
	const doc = new GoogleSpreadsheet(
		"1CCNcbt-nEYZS9z_uowQK7SWmHCPAJGgQ9I8H92C-6Ck"
	);
	await doc.useServiceAccountAuth(creds);

	// or preferably, load that info from env vars / config instead of the file
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
		private_key:
			process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
	});

	await doc.loadInfo();
	const sheet = doc.sheetsByIndex[0]; // ? improve: get training by tab name
	const weekIndexFromQuery = params?.week || "";
	const excersiseData = (await getBasicProgramInfo(sheet)) as Exclude<
		ExcelData,
		"plan"
	>[];

	const programData = (await loadColumnDataByLetter(
		sheet,
		weekIndexFromQuery
	)) as (Plan | undefined)[];

	const dayQuery = params?.day as SlugKeys;
	const slug = DAY_KEYS_BY_ROUTE_MAPPING[dayQuery];

	const programExcersises = excersiseData.filter((item) => item.day === slug);
	const programResult = programData.filter((item) => item?.day === slug);

	const data = programExcersises
		.map((data) => {
			const match = programResult.find((t) => t?.id === data.id);

			if (!match) return { ...data, plan: null };

			return { ...data, plan: match };
		})
		.filter((item) => item);

	return { props: { data } };
};

export default TrainingPage;
