import { ExcelData } from "@/pages/training/[week]/[day]";
import { FC } from "react";
import { SheetDataContext } from "../providers/SheetDataProvider";

export type MockedSheetDataProvider = {
	data?: ExcelData[];
	updateSheet: () => void;
};

export const MockedDataSheetProvider: FC<MockedSheetDataProvider> = ({
	data,
	updateSheet,
	children,
}) => (
	<SheetDataContext.Provider value={{ data, updateSheet }}>
		{children}
	</SheetDataContext.Provider>
);
