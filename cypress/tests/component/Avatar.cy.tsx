import { Avatar } from "@/components/Avatar";
import { red } from "@/styles/tailwind/colors/Red";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";

// Avatar bileşeninin test grubu
describe("Avatar", () => {
	// Varsayılan özelliklerle avatar'ın doğru şekilde render edildiğini test eder
	it("renders the avatar with default props", () => {
		cy.mount(<Avatar image="https://via.placeholder.com/150" alt="test" />);

		cy.getByTestId("avatar").haveCSS({
			overflow: "hidden",
			width: `${remToPx(3)}px`,
			borderRadius: "9999px",
			height: `${remToPx(3)}px`,
		});
	});

	// Özel boyutla avatar'ın doğru şekilde render edildiğini test eder
	it("renders the avatar with custom size", () => {
		cy.mount(<Avatar image="https://via.placeholder.com/150" alt="test" size="lg" />);

		cy.getByTestId("avatar").haveCSS({
			overflow: "hidden",
			width: `${remToPx(4)}px`,
			borderRadius: "9999px",
			height: `${remToPx(4)}px`,
		});
	});

	// Özel yuvarlatma değeriyle avatar'ın doğru şekilde render edildiğini test eder
	it("renders the avatar with custom rounded", () => {
		cy.mount(<Avatar image="https://via.placeholder.com/150" alt="test" rounded="sm" />);

		cy.getByTestId("avatar").haveCSS({ borderRadius: `${remToPx(0.25)}px` });
	});

	// Özel className ile avatar'ın doğru şekilde render edildiğini test eder
	it("renders the avatar with custom className", () => {
		cy.mount(<Avatar image="https://via.placeholder.com/150" alt="test" className="bg-red-500" />);

		cy.getByTestId("avatar").haveCSS({ backgroundColor: getCSSVariableValue(red[500]) });
	});

	// Avatar resminin doğru şekilde render edildiğini test eder
	it("should render avatar image correctly", () => {
		cy.mount(<Avatar image="https://via.placeholder.com/150" alt="test" />);

		cy.getByTestId("avatar-image")
			.should("be.visible")
			.and("have.attr", "src", "https://via.placeholder.com/150")
			.and("have.attr", "alt", "test");
	});
});
