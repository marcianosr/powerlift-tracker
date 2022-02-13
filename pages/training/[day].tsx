import styles from "@/pages/index.module.css";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import ExcersiseListItem from "@/components/ExcersiseListItem";
import { ExceriseInfoItems } from "@/components/ExcersiseListItem/types";
import {
	GoogleSpreadsheet,
	GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import range from "lodash.range";

type TrainingPageProps = {
	data: any;
};

const TrainingPage: NextPage<TrainingPageProps> = ({ data }) => {
	// console.log(data);
	return <h1>Powerlift</h1>;
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
			weight: previous[previous.length - 3].split("x")[0],
			RPE: previous[previous.length - 2],
			previous: {
				weight: previous[previous.length - 4],
				RPE: previous[previous.length - 3],
			},
		})
	);

	return (
		<Layout>
			<h1>{query.day}</h1>
			<section className={styles.list}>
				{excersisesInfo.map((item, idx) => (
					<ExcersiseListItem item={item} idx={idx} key={idx} />
				))}
			</section>
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

const getBasicProgramInfo = async (sheet: GoogleSpreadsheetWorksheet) => {
	const startOffset = 5;
	const totalRowLength = (await sheet.getRows()).length;

	await sheet.loadCells(`A${startOffset}:D${totalRowLength}`); // loads a range of cells

	const rowIndexes = range(startOffset, totalRowLength);

	return rowIndexes.map((idx) => ({
		day: sheet.getCellByA1(`A${idx}`).value,
		excersise: sheet.getCellByA1(`B${idx}`).value,
		sets: sheet.getCellByA1(`C${idx}`).value,
		reps: sheet.getCellByA1(`D${idx}`).value,
	}));
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const creds = require("../../powerlift-339515-4c4a82b74db1.json"); // the file saved above
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

	const excersiseData = await getBasicProgramInfo(sheet);

	const dayQuery = params?.day as SlugKeys;
	const slug = DAY_KEYS_BY_ROUTE_MAPPING[dayQuery];

	const program = excersiseData.filter((item) => item.day === slug);

	const data = {
		program,
	};
	return { props: { data } };
};

export default TrainingPage;
