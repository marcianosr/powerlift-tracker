import { render, screen } from "@testing-library/react";
import WeightLine from ".";

test("it shows weight x reps", () => {
	render(<WeightLine reps={10} weight={200} />);

	screen.getByText("200");
	screen.getByText("kg");
	screen.getByText("x");
	screen.getByText("10");
});
