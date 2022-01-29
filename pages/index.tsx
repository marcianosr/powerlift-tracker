import styles from "@/pages/index.module.css";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parse } from "papaparse";

type Record = {};
export default function Home({ data }) {
	console.log(data);

	return (
		<section>
			<h1>Lifting dashboard</h1>
			{data.map((text) => (
				<ul>
					{text.map((t) => (
						<li>{t}</li>
					))}
				</ul>
			))}
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
}: GetServerSidePropsContext) => {
	const resp = await fetch(
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vQbmSO_PytKWSd2TSuEN2mtxbCDU_DgmPyU-OGBpRNDMMrB1UIWG7E67RVDkKA-fveOPDJZit1P2Jsj/pub?gid=1180621188&single=true&output=csv"
	);

	const text = await resp.text();
	const parsed: string[] = parse(text, {
		delimiter: ",",
		// columns: 10,
		// header: true,
		skipEmptyLines: "greedy",
		// preview: 2,
		// newline: "\n",
	})
		.data.flat()
		.filter((f) => f !== "");

	return {
		props: {
			data: parseCSV(parsed),
		},
	};
};

const parseCSV = (data: string[]) => {
	const firstLineIndex = data.findIndex((a) => a === "A");
	const newData = data.slice(firstLineIndex);
	const records: Record[] = [];

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
