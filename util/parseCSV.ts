export const parseCSV = (data: string[]) => {
	const firstLineIndex = data.findIndex((a) => a === "A");
	const newData = data.slice(firstLineIndex);
	const records: string[][] = [];

	newData.map((text: string, index: number) => {
		if (text === "A" || text === "B" || text === "C" || text === "D") {
			const nextIndex = newData
				.slice(1)
				.findIndex((element: string) => element === "A");

			records.push(
				newData
					.map((text) => text.trim())
					.slice(1 + index, nextIndex + index - 2)
			);
		}
	});

	return records;
};
