import { ExcelData } from "@/pages/training/[week]/[day]";
import { FC, useContext, createContext } from "react";

export type SheetDataState = {};

type SheetDataProviderProps = {
	data: { data: ExcelData[] };
};

type DefaultValue = {
	cell: string;
};

type SheetUpdater = <T>(state: SheetUpdateKeys<T>) => void;
export type SheetUpdateKeys<T> = T & DefaultValue;

export type SheetDataContext = {
	data: ExcelData[];
	updateSheet: SheetUpdater;
};

export const SheetDataContext = createContext<SheetDataContext>({
	data: [],
	updateSheet: (state) => {},
});

export const SheetDataProvider: FC<SheetDataProviderProps> = ({
	data: { data },
	children,
}) => {
	const updateSheet: SheetUpdater = (state) => {
		const update = async () => {
			const data = await fetch("http://localhost:3000/api/sheet/update", {
				method: "POST",
				body: JSON.stringify(state),
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
