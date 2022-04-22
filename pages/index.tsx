import styles from "@/pages/index.module.scss";
import Layout from "@/components/Layout";
import Link from "next/link";
import { getISOWeek, getYear } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import {
	GoogleSpreadsheet,
	GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

import { getDatabase, ref, set, get, child } from "firebase/database";
import {
	generateIndexForColumn,
	getExcelColumnByWeek,
	START_COLUMN_OFFSET,
	START_ROW_OFFSET,
} from "../util";

type OverviewProps = {
	startWeek: string | null;
	currentTrainingWeek: number;
	availableSheetTitles: string[];
	selectedSheet: string;
	error: string | null;
};

const Overview: NextPage<OverviewProps> = ({
	startWeek,
	currentTrainingWeek,
	error,
	availableSheetTitles,
	selectedSheet,
}) => {
	if (error)
		return (
			<Layout>
				<h1>{error}</h1>
			</Layout>
		);

	const currentCalendarWeek = getISOWeek(Date.now());

	const saveActiveSheetToDatabase = (e: React.MouseEvent) => {
		const buttonValue = e.currentTarget.textContent;
		const database = getDatabase();

		set(ref(database, `/user/marciano`), {
			activeSheet: buttonValue,
		});
	};

	return (
		<Layout>
			<section>
				<p>Geselecteerde sheet: {selectedSheet}</p>
				<p>
					Alle actieve sheets:{" "}
					{availableSheetTitles.map((titles) => (
						<Link passHref href={`/?sheet=${titles}`}>
							<button onClick={saveActiveSheetToDatabase}>
								{titles}
							</button>
						</Link>
					))}
				</p>
				{selectedSheet && (
					<>
						<h1>Week {currentCalendarWeek}</h1>
						<h1>Trainingsweek {currentTrainingWeek}</h1>
						<ul>
							<li>
								<Link
									href={`/training/${currentTrainingWeek}/dag-a`}
								>
									Dag 1
								</Link>
							</li>
							<li>
								<Link
									href={`/training/${currentTrainingWeek}/dag-b`}
								>
									Dag 2
								</Link>
							</li>
							<li>
								<Link
									href={`/training/${currentTrainingWeek}/dag-c`}
								>
									Dag 3
								</Link>
							</li>
							<li>
								<Link
									href={`/training/${currentTrainingWeek}/dag-d`}
								>
									Dag 4
								</Link>
							</li>
						</ul>
					</>
				)}
			</section>
		</Layout>
	);
};
7;

// Get the first cell that returns nothing in the RPE get the "last week"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
	const trainingsWeekSheet = doc.sheetsByTitle["Trainingsweken"];
	const sheetFromUrl = query.sheet as any;

	const activeSheetFromDB = await getActiveSheetFromDatabase();

	const selectedSheet = sheetFromUrl || activeSheetFromDB.activeSheet;

	const getAllSheetTitles = Object.keys(doc.sheetsByTitle);
	const getSelectedSheet = doc.sheetsByTitle[selectedSheet];

	////////////////////////////////////////////////// ?
	// ? filter out sheets that are not part of training
	// ? const availableSheetTitles = getAllSheetTitles.filter(
	// ?	(title) => getSelectedSheet.headerValues !== undefined
	// ? );
	//////////////////////////////////////////////// ?

	if (!trainingsWeekSheet) {
		await createSheet(doc);
		return { props: { error: "Verfris deze pagina aub." } };
	}

	// ! Watch out that this code only runs when a user enters the page.
	if (trainingsWeekSheet)
		await addWeekNumberToSheet(trainingsWeekSheet, selectedSheet);

	const getTrainingStartWeek = await findStartWeek(
		trainingsWeekSheet,
		selectedSheet
	);

	const totalRowLength = (await getSelectedSheet.getRows()).length;

	const getCurrentWeek = getISOWeek(Date.now());
	const startWeek = getTrainingStartWeek?.split("-")[0] || "";
	const startWeekIndex = getCurrentWeek - +startWeek;

	const excelColumnForWeek = getExcelColumnByWeek(
		generateIndexForColumn(startWeekIndex) + START_ROW_OFFSET
	);

	await getSelectedSheet.loadCells(
		`${excelColumnForWeek[0]}${START_COLUMN_OFFSET}:${excelColumnForWeek[1]}${totalRowLength}`
	);

	return {
		props: {
			startWeek: getTrainingStartWeek,
			currentTrainingWeek: startWeekIndex,
			availableSheetTitles: getAllSheetTitles,
			selectedSheet: activeSheetFromDB.activeSheet, // || sheet from db
		},
	};
};

export const getActiveSheetFromDatabase = async () => {
	const database = ref(getDatabase());

	return get(child(database, `user/marciano`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				console.log("No data available");
			}
		})
		.catch((error) => {
			console.error(error);
		});
};

const addWeekNumberToSheet = async (
	sheet: GoogleSpreadsheetWorksheet,
	selectedSheet: string
) => {
	const rows = await sheet.getRows();
	const getWeekAndYear = `${getISOWeek(Date.now())}-${getYear(Date.now())}`;

	if (rows.length === 0)
		return sheet.addRow({
			startWeek: getWeekAndYear,
			sheet: selectedSheet,
		});

	const findExistingSheetValue = rows.find(
		(row) => row.sheet === selectedSheet
	);

	if (!findExistingSheetValue) {
		return sheet.addRow({
			startWeek: getWeekAndYear,
			sheet: selectedSheet,
		});
	}

	return;
};

const findStartWeek = async (
	sheet: GoogleSpreadsheetWorksheet,
	selectedSheet: string
) => {
	const rows = await sheet.getRows();

	const startWeek = rows.find(
		(row) => row.sheet === selectedSheet
	)?.startWeek;

	return startWeek;
};

const createSheet = async (doc: GoogleSpreadsheet) =>
	doc.addSheet({
		headerValues: [
			"startWeek",
			"sheet",
			"Dit blad wordt autogegenereerd. Niet verwijderen aub!",
		],
		title: "Trainingsweken",
	});

export default Overview;
