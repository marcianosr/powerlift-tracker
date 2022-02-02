import { render } from "@testing-library/react";
import ExcersiseInfoItem from "./";

describe("ExcersiseInfoItem", () => {
	it("renders the ExcersiseInfoItem with it's excersise name, sets and reps", () => {
		const { getByText } = render(
			<ExcersiseInfoItem
				excersise="Low bar squat"
				sets="4"
				reps="4"
				idx={1}
				setsCounter={2}
				previousLifts={{ weight: "165kg x 3", RPE: "7" }}
				currentLifts={{ weight: "175kg x 3", RPE: "7" }}
			/>
		);

		getByText("Low bar squat");
		// getByText("175kg");
		// getByText("Resultaat");
	});
});
