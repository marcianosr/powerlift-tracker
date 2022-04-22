import { GoogleSpreadsheet } from "google-spreadsheet";
import { NextApiRequest, NextApiResponse } from "next";
import { SheetUpdateKeys } from "providers/SheetDataProvider";
import { getActiveSheetFromDatabase } from "../..";

const update = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return;

	const activeSheetFromDB = await getActiveSheetFromDatabase();

	if (!activeSheetFromDB) {
		throw new Error("No sheet name is saved in the DB.");
	}

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

	const sheet = doc.sheetsByTitle[activeSheetFromDB.activeSheet]; // ? What happens if no sheet is given?
	const parsedState: SheetUpdateKeys<Record<string, string>> = JSON.parse(
		// ? improve typing
		req.body
	);

	await sheet.loadCells(`A1:${parsedState.cell}`); // ? optimize this later. A1 should be one letter before the state letter.
	const a1Cell = sheet.getCellByA1(parsedState.cell);

	if (!a1Cell.value) {
		console.log("no value");

		a1Cell.value = `${parsedState.weight}kg x`;

		await sheet.saveUpdatedCells();

		return res.status(201).json({
			message: `Succesfully updated sheet`,
			data: {},
		});
	}

	if (a1Cell.value) {
		const [_, reps] = String(a1Cell.value).split("x");
		const modifiedValue = [`${parsedState.weight}kg x`, reps]; // ! Make nicer later...?

		a1Cell.value = modifiedValue.join("").toString(); // Prevent toString from adding comma's https://stackoverflow.com/questions/30508242/javascript-split-adding-extra-commas
		await sheet.saveUpdatedCells();
	}

	return res.status(201).json({
		message: `Succesfully updated sheet`,
		data: {},
	});
};

export default update;
