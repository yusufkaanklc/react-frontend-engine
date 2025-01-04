import { Radiobox } from "@/components/inputs/Radiobox";

describe("Radiobox Component", () => {
	it("should render with default props", () => {
		cy.mount(<Radiobox name="test-radiobox" />);

		// Radiobox elemanının render edildiğini kontrol et
		cy.getByTestId("radiobox").should("exist");

		// Radiobox'un varsayılan olarak checked olmadığını kontrol et
		cy.getByTestId("radiobox").should("not.be.checked");

		// Radiobox'un varsayılan olarak "primary-main" renginde olduğunu kontrol et
		cy.getByTestId("radiobox").should("have.class", "text-primary-main");

		// Radiobox'un varsayılan boyutunun "md" olduğunu kontrol et
		cy.getByTestId("radiobox").should("have.class", "w-5 h-5");
	});

	it("should apply checked state", () => {
		cy.mount(<Radiobox name="checked-radiobox" checked={true} />);

		// Radiobox'un checked durumda olduğunu kontrol et
		cy.getByTestId("radiobox").should("be.checked");
	});

	it("should apply custom color", () => {
		cy.mount(<Radiobox name="custom-color-radiobox" color="danger-main" />);

		// Radiobox'un 'danger-main' renginde olduğunu kontrol et
		cy.getByTestId("radiobox").should("have.class", "text-danger-main");
	});

	it("should apply custom size", () => {
		cy.mount(<Radiobox name="large-size-radiobox" size="lg" />);

		// Radiobox'un boyutunun "lg" olduğunu kontrol et
		cy.getByTestId("radiobox").should("have.class", "w-6 h-6");
	});

	it("should handle change event", () => {
		const onChangeMock = cy.stub();
		cy.mount(<Radiobox name="change-event-radiobox" onChange={onChangeMock} />);

		// Radiobox'a tıklanmalı
		cy.getByTestId("radiobox").click();

		// onChange fonksiyonunun çağrıldığını kontrol et
		cy.wrap(onChangeMock).should("have.been.called");

		// Radiobox'un checked olduğunu kontrol et
		cy.getByTestId("radiobox").should("be.checked");
	});

	it("should be read-only when readOnly is true", () => {
		cy.mount(<Radiobox name="readonly-radiobox" readOnly={true} />);

		// Radiobox'un readonly olduğunu kontrol et
		cy.getByTestId("radiobox").should("have.attr", "readonly");
	});

	it("should apply custom className", () => {
		cy.mount(<Radiobox name="custom-classname-radiobox" className="custom-class" />);

		// Radiobox wrapper'ının custom class'a sahip olduğunu kontrol et
		cy.getByTestId("radiobox").should("have.class", "custom-class");
	});
});
