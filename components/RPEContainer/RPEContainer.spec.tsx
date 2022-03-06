import { render, screen } from "@testing-library/react";
import RPEContainer from ".";

test("it shows an empty RPE when no RPE is given", () => {
	render(<RPEContainer RPE={0} />);
	screen.getByTestId("empty-rpe");
});

test("it shows an RPE number when an RPE is given", () => {
	render(<RPEContainer RPE={10} />);
	screen.getByText(10);
});
