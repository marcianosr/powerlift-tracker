import styles from "@/pages/index.module.css";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { getBasicProgramInfo, loadColumnDataByLetter } from "../../../util";
import CurrentExercise from "@/components/CurrentExercise";
import Header from "@/components/Header";

type TrainingPageProps = {
	data: any;
};

const TrainingPage: NextPage<TrainingPageProps> = ({ data }) => {
	const { query } = useRouter();

	return (
		<Layout>
			<Header pageTitle={query.day} />
			<CurrentExercise data={data} />
		</Layout>
	);
};

type SlugKeys = "dag-a" | "dag-b" | "dag-c" | "dag-d";
type SlugValues = "A" | "B" | "C" | "D";
type SlugMappingTypes = {
	[key in SlugKeys]: SlugValues;
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
	const excersiseData = await getBasicProgramInfo(sheet);

	const programData = await loadColumnDataByLetter(sheet, weekIndexFromQuery);

	const dayQuery = params?.day as SlugKeys;
	const slug = DAY_KEYS_BY_ROUTE_MAPPING[dayQuery];

	const programExcersises = excersiseData.filter((item) => item.day === slug);
	const programResult = programData.filter((item) => item?.day === slug);

	const data = programExcersises.map((data) => {
		const match = programResult.find((t) => t?.id === data.id);

		return { ...data, result: match || null };
	});

	return { props: { data } };
};

export default TrainingPage;
