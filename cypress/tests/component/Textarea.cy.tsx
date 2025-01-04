import { Textarea } from "@/components/inputs/Textarea";

describe("Textarea Component", () => {
	const setup = (props = {}) => {
		// Textarea bileşeni mount edilir
		cy.mount(
			<div className="h-screen flex items-center justify-center">
				<Textarea data-testid="test-textarea" {...props} />
			</div>,
		);
	};

	it("should render the textarea", () => {
		// Textarea bileşeninin doğru şekilde render edildiği doğrulanır
		setup();

		const textarea = cy.getByTestId("test-textarea");
		textarea.should("exist");
		textarea.should("have.attr", "rows", "4");
		textarea.should("not.have.attr", "data-invalid", "true");
	});

	it("should apply custom class names", () => {
		// className prop'unun doğru bir şekilde uygulandığı kontrol edilir
		const customClass = "custom-class";
		setup({ className: customClass });

		const textarea = cy.getByTestId("test-textarea");
		textarea.should("have.class", customClass);
	});

	it("should handle the isInvalid prop", () => {
		// isInvalid prop'unun data-invalid özelliği üzerinden doğru çalıştığı kontrol edilir
		setup({ isInvalid: true });

		const textarea = cy.getByTestId("test-textarea");
		textarea.should("have.attr", "data-invalid", "true");
		textarea.should("have.class", "data-[invalid='true']:border-error-dark");
	});

	it("should accept custom row count", () => {
		// rows prop'unun doğru şekilde uygulandığı doğrulanır
		const rowCount = 6;
		setup({ rows: rowCount });

		const textarea = cy.getByTestId("test-textarea");
		textarea.should("have.attr", "rows", rowCount.toString());
	});

	it("should handle hover and focus states", () => {
		// Hover ve focus durumlarının doğru bir şekilde çalıştığı kontrol edilir
		setup();

		const textarea = cy.getByTestId("test-textarea");

		// Hover durumunu simüle eder
		textarea.trigger("mouseover");
		textarea.should("have.class", "data-[invalid='false']:hover:border-primary-main");

		// Focus durumunu simüle eder
		textarea.focus();
		textarea.should("have.class", "data-[invalid='false']:focus:border-primary-main");
	});
});
