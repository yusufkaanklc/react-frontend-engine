import { Dropdown } from "@/components/dropdown/Dropdown";
import { DropdownItem } from "@/components/dropdown/DropdownItem";
import { DropdownTrigger } from "@/components/dropdown/DropdownTrigger";
import type { IDropdown, IDropdownStyle } from "@/interfaces/components/dropdown/IDropdown";
import { action } from "@/styles/tailwind/colors/Action";
import { color } from "@/styles/tailwind/colors/Color";
import { custom } from "@/styles/tailwind/colors/Custom";
import { paper } from "@/styles/tailwind/colors/Paper";
import { primary } from "@/styles/tailwind/colors/Primary";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";
import type { CSSProperties } from "react";

const setup = (props: Omit<IDropdown, "children">) => {
	cy.mount(
		<div className="flex justify-center h-screen items-center">
			<span data-testid="any-click">any text</span>
			<Dropdown {...props}>
				<DropdownTrigger>trigger</DropdownTrigger>
				<DropdownItem id="menu-1">menu 1</DropdownItem>
				<DropdownItem id="menu-2">menu 2</DropdownItem>
			</Dropdown>
		</div>,
	);
};

const blackRGBA = "rgba(0, 0, 0, 0)";
const whiteRGB = "rgb(255, 255, 255)";

// Özel stiller tanımlanıyor
const stylesProps: IDropdownStyle = {
	trigger: {
		defaultStyleActive: true,
		customStyle: "test",
	},
	menu: {
		defaultStyleActive: false,
		customStyle: "test",
	},
	item: {
		defaultStyleActive: true,
		customStyle: "test",
	},
};

const defaultDropdownTriggerStyles: CSSProperties = {
	display: "inline-flex",
	alignItems: "center",
	fontSize: `${remToPx(0.875)}px`,
	overflow: "hidden",
	color: getCSSVariableValue(color.primary),
	borderRadius: `${remToPx(0.5)}px`,
	cursor: "pointer",
	border: `0.8px solid ${getCSSVariableValue(custom.divider)}`,
	backgroundColor: getCSSVariableValue(paper.card),
	padding: `${remToPx(0.25)}px ${remToPx(0.5)}px`,
};

const defaultDropdownMenuStyles: CSSProperties = {
	backgroundColor: getCSSVariableValue(paper.card),
	position: "absolute",
	borderTopWidth: "0.8px",
	borderBottomWidth: "0.8px",
	overflow: "hidden",
	borderRadius: `${remToPx(0.5)}px`,
	borderColor: getCSSVariableValue(custom.divider),
	width: `${remToPx(14)}px`,
	margin: `${remToPx(0.5)}px 0px 0px`,
	left: "0px",
};

const defaultDropdownItemStyles = (isSelectedMenu = false, isHovered = false) =>
	({
		fontSize: `${remToPx(0.875)}px`,
		padding: `${remToPx(0.75)}px`,
		backgroundColor: isSelectedMenu
			? isHovered
				? getCSSVariableValue(action.hover)
				: getCSSVariableValue(primary.main)
			: blackRGBA,
		color: isSelectedMenu ? (isHovered ? getCSSVariableValue(color.primary) : whiteRGB) : getCSSVariableValue(color.primary),
	}) as CSSProperties;

describe("Dropdown Component", () => {
	beforeEach(() => {
		cy.viewport(1280, 720);
	});

	it("Should dropdown rendered correctly based on default props", () => {
		setup({ isOpen: true, selectedMenu: "deneme" });

		const dropdown = cy.getByTestId("dropdown");
		dropdown.should("be.visible");
		dropdown.haveCSS({ position: "relative" });

		const dropdownMenu = cy.getByTestId("dropdown-menu");
		dropdownMenu.should("be.visible");
		dropdownMenu.haveCSS(defaultDropdownMenuStyles);

		const dropdownTrigger = cy.getByTestId("dropdown-trigger");
		dropdownTrigger.should("be.visible");
		dropdownTrigger.haveCSS(defaultDropdownTriggerStyles);
		dropdownTrigger.should("have.text", "trigger");

		const dropdownItems = cy.getByTestId("dropdown-item");
		dropdownItems.should("have.length", "2");
		dropdownItems.haveCSS(defaultDropdownItemStyles());
		dropdownItems.each((item, index) => {
			cy.wrap(item).should("have.text", index === 0 ? "menu 1" : "menu 2");
		});
	});

	it("Should rendered correctly to Dropdown based on custom styles", () => {
		setup({ isOpen: true, styleClass: stylesProps });

		const dropdownMenu = cy.getByTestId("dropdown-menu");
		dropdownMenu.should("be.visible");
		dropdownMenu.should("have.class", "test");

		const dropdownTrigger = cy.getByTestId("dropdown-trigger");
		dropdownTrigger.should("be.visible");
		dropdownTrigger.should("have.class", "test");

		const dropdownItems = cy.getByTestId("dropdown-item");
		dropdownItems.should("have.length", "2");
		dropdownItems.should("have.class", "test");
	});

	it("Should correct styles applies on Select to DropdownItem", () => {
		setup({ isOpen: true, closeToClickInside: false });

		cy.getByTestId("dropdown-item").each((item) => {
			cy.wrap(item).haveCSS(defaultDropdownItemStyles());
		});

		cy.getByTestId("dropdown-item").each((item, index) => {
			if (index === 0) {
				item.trigger("click");
				cy.wait(500);
			}
			cy.wrap(item).haveCSS(defaultDropdownItemStyles(index === 0));
		});
	});

	it("Should correct rules applied when", () => {
		setup({});

		cy.getByTestId("dropdown-menu").should("not.exist");

		cy.getByTestId("dropdown-trigger").trigger("click");

		cy.getByTestId("dropdown-menu").should("be.visible");

		cy.getByTestId("dropdown-menu").trigger("click");

		cy.getByTestId("dropdown-menu").should("not.exist");

		cy.getByTestId("dropdown-trigger").trigger("click");

		cy.getByTestId("any-click").trigger("click");

		cy.getByTestId("dropdown-menu").should("not.exist");

		setup({ closeToClickInside: false, closeToClickOutside: false });

		cy.getByTestId("dropdown-trigger").trigger("click");

		cy.getByTestId("dropdown-menu").should("be.visible");

		cy.getByTestId("dropdown-menu").trigger("click");

		cy.getByTestId("dropdown-menu").should("be.visible");

		cy.getByTestId("any-click").trigger("click");

		cy.getByTestId("dropdown-menu").should("be.visible");
	});

	it("Should correct render to Dropdown when added position prop", () => {
		setup({ position: "bottom", isOpen: true });

		cy.getByTestId("dropdown-menu").should("have.class", "mt-2 left-1/2 -translate-x-1/2");

		setup({ position: "top", isOpen: true });

		cy.getByTestId("dropdown-menu").should("have.class", "bottom-full mb-3 left-1/2 -translate-x-1/2");

		setup({ position: "right", isOpen: true });

		cy.getByTestId("dropdown-menu").should("have.class", "ml-2 left-full top-1/2 -translate-y-1/2");

		setup({ position: "left", isOpen: true });

		cy.getByTestId("dropdown-menu").should("have.class", "mr-2 right-full top-1/2 -translate-y-1/2");

		setup({ position: "top-right", isOpen: true });

		cy.getByTestId("dropdown-menu").should("have.class", "mb-3 bottom-full left-0");

		setup({ position: "top-left", isOpen: true });

		cy.getByTestId("dropdown-menu").should("have.class", "mb-3 bottom-full right-0");

		setup({ position: "bottom-right", isOpen: true });

		cy.getByTestId("dropdown-menu").should("have.class", "mt-2 left-0");

		setup({ position: "bottom-left", isOpen: true });

		cy.getByTestId("dropdown-menu").should("have.class", "mt-2 right-0");
	});
});
