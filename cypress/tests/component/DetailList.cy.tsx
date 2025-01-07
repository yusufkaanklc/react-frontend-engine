import { DetailList } from "@/components/DetailList";
import { remToPx } from "@/utils/RemToPx";
import type { CSSProperties } from "react";

describe("DetailList Component", () => {
	const mockData = [
		{ title: "Name", value: "John Doe" },
		{ title: "Email", value: "john@example.com" },
		{ title: "Phone", value: "+1234567890" },
	];

	const setupDetailList = (options = {}) => {
		// Test bileşenini monte et
		cy.mount(<DetailList data={mockData} options={options} />);
	};

	describe("Default Rendering", () => {
		beforeEach(() => {
			setupDetailList();
		});

		it("should render container with default styles", () => {
			const containerStyles: CSSProperties = {
				borderRadius: remToPx(0.5),
				paddingTop: remToPx(0.75),
				paddingBottom: remToPx(0.75),
				borderWidth: "1px",
				borderStyle: "solid",
			};

			cy.getByTestId("detail-list-container").should("be.visible").haveCSS(containerStyles);
		});

		it("should render all list items correctly", () => {
			cy.getByTestId("detail-list-item")
				.should("have.length", mockData.length)
				.each(($item, index) => {
					// Her liste öğesinin başlık ve değerini doğrula
					cy.wrap($item).within(() => {
						cy.get("dt").should("have.text", mockData[index].title);
						cy.get("dd").should("have.text", mockData[index].value);
					});
				});
		});

		it("should apply correct grid layout styles", () => {
			const gridStyles: CSSProperties = {
				display: "grid",
				gridTemplateColumns: "407.328px 407.328px 407.328px",
			};

			cy.getByTestId("detail-list-item").first().haveCSS(gridStyles);

			cy.viewport("iphone-x");

			const smGridStyles: CSSProperties = {
				gridTemplateColumns: "349px",
			};

			cy.getByTestId("detail-list-item").first().haveCSS(smGridStyles);
		});
	});

	describe("Custom Options", () => {
		it("should render without borders when bordered=false", () => {
			setupDetailList({ bordered: false });

			cy.getByTestId("detail-list-container").haveCSS({ borderWidth: "0px" });
		});

		it("should render without stripes when striped=false", () => {
			setupDetailList({ striped: false });

			cy.getByTestId("detail-list-item").each(($item) => {
				cy.wrap($item).should("not.have.class", "even:bg-action-hover");
			});
		});

		it("should apply custom className correctly", () => {
			const customClass = "custom-detail-list";
			setupDetailList({ className: customClass });

			cy.getByTestId("detail-list-container").should("have.class", customClass);
		});

		it("should apply custom styleClass correctly", () => {
			const customStyles = {
				"detail-list-container": {
					customStyle: "custom-container-class",
					defaultStyleActive: false,
				},
				"detail-list-item": {
					customStyle: "custom-item-class",
				},
			};

			setupDetailList({ styleClass: customStyles });

			cy.getByTestId("detail-list-container")
				.should("have.class", "custom-container-class")
				.should("not.have.class", "flow-root");

			cy.getByTestId("detail-list-item").first().should("have.class", "custom-item-class");
		});
	});

	describe("Edge Cases", () => {
		it("should handle empty data array", () => {
			// Boş veri dizisi durumunu test et
			cy.mount(<DetailList data={[]} options={{}} />);

			cy.getByTestId("detail-list-item").should("not.exist");
		});

		it("should handle long content without breaking layout", () => {
			// Uzun içerik durumunda düzenin bozulmamasını test et
			const longData = [
				{
					title: "Very Long Title That Should Not Break Layout".repeat(3),
					value: "Very Long Value Content That Should Not Break Layout".repeat(5),
				},
			];

			cy.mount(<DetailList data={longData} options={{}} />);

			const textStyles: CSSProperties = {
				wordWrap: "break-word",
			};

			cy.getByTestId("detail-list-item").first().find("dd").haveCSS(textStyles);
		});
	});
});
