import { ExcelData } from "@/pages/training/[week]/[day]";
import { FC, useContext, createContext, useState, useEffect } from "react";

export type SheetDataState = {};

type SheetDataProviderProps = {
	data: { data: ExcelData[] };
};
export type SheetDataContext = {
	data: ExcelData[];
	updateSheet: (state: any) => void;
};

export const SheetDataContext = createContext<SheetDataContext>({
	data: [],
	updateSheet: (state: any) => {},
});

export const SheetDataProvider: FC<SheetDataProviderProps> = ({
	data: { data },
	children,
}) => {
	const updateSheet = (state: any) => {
		const d = "F3:G3";
		const update = async () => {
			const data = await fetch("http://localhost:3000/api/sheet/update", {
				method: "POST",
				body: JSON.stringify(d),
			});

			const result = await data.json();

			console.log("result", result);
			console.log("update sheet with api call");
		};

		update()
			// make sure to catch any error
			.catch((error) => console.log("errorrr", error));
	};

	return (
		<SheetDataContext.Provider value={{ updateSheet, data }}>
			{children}
		</SheetDataContext.Provider>
	);
};

export const useDataSheet = (): SheetDataContext =>
	useContext(SheetDataContext);
