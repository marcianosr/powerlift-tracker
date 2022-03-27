import styles from "@/pages/index.module.scss";
import Layout from "@/components/Layout";
import Link from "next/link";
import { getISOWeek, getYear } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import {
	GoogleSpreadsheet,
	GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

type OverviewProps = {
	trainingWeek: string | null;
	error: string | null;
};

const Overview: NextPage<OverviewProps> = ({ trainingWeek, error }) => {
	if (error)
		return (
			<Layout>
				<h1>{error}</h1>
			</Layout>
		);
	// link to training/11/dag-a
	const getCurrentWeek = getISOWeek(Date.now());
	// const trainingWeek = getCurrentWeek - sheetNumberWeekOffset;
	return (
		<Layout>
			<section>
				<h1>Nog 8 weken tot het NK</h1>
				<h1>Week {getCurrentWeek}</h1>
				<h1>Trainingsweek {trainingWeek?.split("-")[0]}</h1>
				<ul>
					<li>
						<Link href={`/training/${trainingWeek}/dag-a`}>
							Dag 1
						</Link>
					</li>
					<li>
						<Link href={`/training/${trainingWeek}/dag-b`}>
							Dag 2
						</Link>
					</li>
					<li>
						<Link href={`/training/${trainingWeek}/dag-c`}>
							Dag 3
						</Link>
					</li>
					<li>
						<Link href={`/training/${trainingWeek}/dag-d`}>
							Dag 4
						</Link>
					</li>
				</ul>
			</section>
		</Layout>
	);
};
7;

// Get the first cell that returns nothing in the RPE get the "last week"

export const getServerSideProps: GetServerSideProps = async () => {
	const creds = require("../powerlift-339515-4c4a82b74db1.json"); // the file saved above
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

	const sheet = doc.sheetsByTitle["Trainingsweken"];

	if (!sheet) {
		await createSheet(doc);
		return { props: { error: "Verfris deze pagina aub." } };
	}

	// ! Watch out that this code only runs when a user enters the page.
	if (sheet) await addWeekNumberToSheet(sheet);

	const lastTrainingWeek = await getLastTrainingWeek(sheet);

	return { props: { trainingWeek: lastTrainingWeek } };
};

const addWeekNumberToSheet = async (sheet: GoogleSpreadsheetWorksheet) => {
	const rows = await sheet.getRows();
	const getWeekAndYear = `${getISOWeek(Date.now())}-${getYear(Date.now())}`;

	if (rows.length === 0) return sheet.addRow({ week: getWeekAndYear });

	const lastElement = rows[rows.length - 1];

	const lastWeekValue = lastElement.week;

	if (lastWeekValue !== getWeekAndYear) {
		return sheet.addRow({ week: getWeekAndYear });
	}

	return;
};

const getLastTrainingWeek = async (sheet: GoogleSpreadsheetWorksheet) => {
	const rows = await sheet.getRows();

	const lastElement = rows[rows.length - 1];

	const lastWeekValue = lastElement.week;
	return lastWeekValue;
};

const createSheet = async (doc: GoogleSpreadsheet) =>
	doc.addSheet({
		headerValues: [
			"week",
			"Dit blad wordt autogegenereerd. Niet verwijderen aub!",
		],
		title: "Trainingsweken",
	});

export default Overview;
