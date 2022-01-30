import { render } from "@testing-library/react";
import ExcersiseInfoItem from "./";

describe("ExcersiseInfoItem", () => {
	it("renders the ExcersiseInfoItem with it's excersise name, sets and reps", () => {
		const { getByText } = render(
			<ExcersiseInfoItem excersise="Low bar squat" sets="4" reps="4" />
		);

		getByText("Oefening");
		getByText("Low bar squat");
		getByText("Sets");
		getByText("Reps");
	});
});
