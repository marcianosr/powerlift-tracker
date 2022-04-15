import { GoogleSpreadsheet } from "google-spreadsheet";
import { NextApiRequest, NextApiResponse } from "next";

const update = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return;

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
	const sheet = doc.sheetsByTitle["Trainingsweken"]; // ? improve: get training by tab name
	await sheet.loadCells("A1:G15");
	const a1Cell = sheet.getCellByA1("G3");
	a1Cell.value = "Furnace Fun!";
	console.log("update backend", req.body);

	await sheet.saveUpdatedCells();

	// console.log("json", JSON.stringify(sheet));

	return res.status(201).json({
		message: `Succesfully updated sheet`,
		data: {},
	});
};

export default update;
