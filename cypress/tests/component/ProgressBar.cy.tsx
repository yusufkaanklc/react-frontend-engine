import { ProgressBar } from "@/components/ProgressBar";
import { action } from "@/styles/tailwind/colors/Action";
import { primary } from "@/styles/tailwind/colors/Primary";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";

const setup = (value: number) => {
	cy.mount(
		<div className="w-screen h-screen">
			<ProgressBar value={value} />
		</div>,
	);
};

describe("ProgressBar Component", () => {
	beforeEach(() => {
		setup(50);
	});

	it("should render Progress Bar correctly", () => {
		cy.getByTestId("progress-bar").should("exist").and("be.visible");
	});

	it("should have correct style properties", () => {
		cy.getByTestId("progress-bar-container").haveCSS({
			display: "block",
			borderRadius: "9999px",
			backgroundColor: getCSSVariableValue(action.disabled),
		});
		cy.getByTestId("progress-bar-fill").haveCSS({ height: "16px", backgroundColor: getCSSVariableValue(primary.main) });
	});

	it("should work correctly with different values", () => {
		// %50 değeri için test
		cy.getByTestId("progress-bar-container").should("have.attr", "aria-valuenow", "50");

		cy.getByTestId("progress-bar-fill")
			.should("have.css", "width", `${innerWidth / 2}px`)
			.find(".text-white")
			.should("have.text", "50%");

		setup(0);

		cy.getByTestId("progress-bar-container").should("have.attr", "aria-valuenow", "0");

		// %0 olduğunda fill elementi görünmemeli
		cy.getByTestId("progress-bar-fill").should("not.be.visible");

		setup(100);

		// %100 değeri için test
		cy.getByTestId("progress-bar-container").should("have.attr", "aria-valuenow", "100");

		cy.getByTestId("progress-bar-fill")
			.should("have.css", "width", `${innerWidth}px`)
			.find(".text-white")
			.should("have.text", "100%");
	});

	it("should have accessibility properties", () => {
		cy.getByTestId("progress-bar-container")
			.should("have.attr", "aria-valuemin", "0")
			.and("have.attr", "aria-valuemax", "100")
			.and("have.attr", "aria-labelledby", "ProgressLabel")
			.and("have.attr", "tabIndex", "0");

		cy.getByTestId("progress-bar").find("#ProgressLabel").should("have.class", "sr-only").and("have.text", "Progress Bar");
	});
});
