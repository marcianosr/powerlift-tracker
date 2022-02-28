import styles from "@/pages/index.module.css";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { getBasicProgramInfo, loadColumnDataByLetter } from "../../../util";

type TrainingPageProps = {
	data: any;
};

const TrainingPage: NextPage<TrainingPageProps> = ({ data }) => {
	console.log(data);
	const { query } = useRouter();

	return (
		<Layout>
			<h1>{query.day}</h1>
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
	const sheet = doc.sheetsByIndex[0];
	const weekIndexFromQuery = params?.week || "";
	const excersiseData = await getBasicProgramInfo(sheet);
	const programData = await loadColumnDataByLetter(sheet, weekIndexFromQuery);

	const dayQuery = params?.day as SlugKeys;
	const slug = DAY_KEYS_BY_ROUTE_MAPPING[dayQuery];

	const programExcersises = excersiseData.filter((item) => item.day === slug);
	const currentProgram = programData.filter((item) => item?.day === slug);

	const data = {
		programExcersises,
		currentProgram,
	};
	return { props: { data } };
};

export default TrainingPage;
