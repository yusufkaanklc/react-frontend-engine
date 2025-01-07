import { Button, Card, CardAction, CardBody, CardHeader, type ICustomStylesConfig } from "@/index";
import type { ICard } from "@/interfaces/components/card/ICard";
import { color } from "@/styles/tailwind/colors/Color";
import { custom } from "@/styles/tailwind/colors/Custom";
import { paper } from "@/styles/tailwind/colors/Paper";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";
import type { CSSProperties } from "react";

const setup = (props: Omit<ICard, "children">) => {
	cy.mount(
		<Card {...props}>
			<CardHeader>Card Header</CardHeader>
			<CardBody>Card Body</CardBody>
			<CardAction>
				<Button>Action 1</Button>
				<Button colorScheme="error">Action 2</Button>
			</CardAction>
		</Card>,
	);
};

const stylesProps: Record<"card" | "cardHeader" | "cardBody" | "cardAction", ICustomStylesConfig> = {
	card: {
		defaultStyleActive: true,
		customStyle: "mt-1",
	},
	cardHeader: {
		defaultStyleActive: true,
		customStyle: "mt-1",
	},
	cardBody: {
		defaultStyleActive: true,
		customStyle: "mt-1",
	},
	cardAction: {
		defaultStyleActive: false,
		customStyle: "mt-1",
	},
};

const defaultCardStyles: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: remToPx(2),
	padding: remToPx(1.25),
	backgroundColor: getCSSVariableValue(paper.card),
	border: `1px solid ${getCSSVariableValue(custom["card-border"])}`,
	borderRadius: remToPx(0.5),
	width: remToPx(20),
};

const defaultCardHeaderStyles: CSSProperties = {
	fontSize: remToPx(1.25),
	color: getCSSVariableValue(color.primary),
};

const defaultCardBodyStyles: CSSProperties = {
	fontSize: remToPx(0.875),
	color: getCSSVariableValue(color.primary),
};

const defaultCardActionStyles: CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: remToPx(1),
};

describe("Card Component and sub components", () => {
	it("Rendered with default props", () => {
		setup({});

		const card = cy.getByTestId("card");
		const cardHeader = cy.getByTestId("card-header");
		const cardBody = cy.getByTestId("card-body");
		const cardAction = cy.getByTestId("card-action");

		cy.wait(100);

		card.should("be.visible");
		cardHeader.should("have.text", "Card Header");
		cardBody.should("be.visible");
		cardBody.should("have.text", "Card Body");
		cardAction.should("be.visible");
		cardAction.should("have.text", "Action 1Action 2");
	});

	it("Should apply correct styles to Card with default props", () => {
		setup({});

		const card = cy.getByTestId("card");
		const cardHeader = cy.getByTestId("card-header");
		const cardBody = cy.getByTestId("card-body");
		const cardAction = cy.getByTestId("card-action");

		card.haveCSS(defaultCardStyles);
		cardHeader.haveCSS(defaultCardHeaderStyles);
		cardBody.haveCSS(defaultCardBodyStyles);
		cardAction.haveCSS(defaultCardActionStyles);
	});

	it("Should apply correct styles to Card based on size prop", () => {
		const sizes = {
			sm: remToPx(16),
			md: remToPx(20),
			lg: remToPx(24),
			xl: remToPx(40),
			"2xl": remToPx(56),
			full: `${window.innerWidth}px`,
		};

		// biome-ignore lint/complexity/noForEach: <explanation>
		Object.entries(sizes).forEach(([size, expectedWidth]) => {
			setup({ size: size as ICard["size"] });

			const card = cy.getByTestId("card");

			card.haveCSS({
				width: expectedWidth,
			});
		});
	});

	it("Should apply correct styles to Card based on styles prop", () => {
		setup({ styleClass: stylesProps });

		cy.wait(100);

		const card = cy.getByTestId("card");
		const cardHeader = cy.getByTestId("card-header");
		const cardBody = cy.getByTestId("card-body");
		const cardAction = cy.getByTestId("card-action");

		card.haveCSS({
			...defaultCardStyles,
			marginTop: remToPx(0.25),
		});

		cardHeader.haveCSS({
			...defaultCardHeaderStyles,
			marginTop: remToPx(0.25),
		});

		cardBody.haveCSS({
			...defaultCardBodyStyles,
			marginTop: remToPx(0.25),
		});

		cardAction.haveCSS({
			marginTop: remToPx(0.25),
		});
	});
});
