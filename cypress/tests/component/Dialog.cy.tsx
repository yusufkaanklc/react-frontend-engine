import { Button } from "@/components/Button";
import { Dialog } from "@/components/dialog/Dialog";
import { DialogAction } from "@/components/dialog/DialogAction";
import { DialogBody } from "@/components/dialog/DialogBody";
import { DialogHeader } from "@/components/dialog/DialogHeader";
import { dialogEvents } from "@/events/DialogEvents";
import type { IDialog, IDialogTypes } from "@/interfaces/components/dialog/IDialog";
import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig";
import { paper } from "@/styles/tailwind/colors/Paper";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { mediaQueryUtil } from "@/utils/MediaQueryUtil";
import { remToPx } from "@/utils/RemToPx";
import type { CSSProperties } from "react";

const setup = (props: Omit<IDialog, "children">) => {
	cy.mount(
		<>
			<Dialog {...props}>
				<DialogHeader>Dialog Header</DialogHeader>
				<DialogBody>Dialog Body</DialogBody>
				<DialogAction>
					<Button>Action 1</Button>
					<Button colorScheme="error">Action 2</Button>
				</DialogAction>
			</Dialog>
			<Button type="button" onClick={() => dialogEvents().toggle("test-dialog")}>
				Değiştir
			</Button>
		</>,
	);
};

const stylesProps: Record<"dialog" | "dialogHeader" | "dialogBody" | "dialogAction", ICustomStylesConfig> = {
	dialog: {
		defaultStyleActive: true,
		customStyle: "mt-1",
	},
	dialogHeader: {
		defaultStyleActive: true,
		customStyle: "mt-1",
	},
	dialogBody: {
		defaultStyleActive: true,
		customStyle: "mt-1",
	},
	dialogAction: {
		defaultStyleActive: false,
		customStyle: "mt-1",
	},
};

const defaultDialogStyles = (type: IDialogTypes = "modal", zIndex = "101") =>
	({
		zIndex,
		backgroundColor: getCSSVariableValue(paper.level2),
		overflow: "hidden",
		padding: `${remToPx(1)}px`,
		display: "flex",
		flexDirection: "column",
		gap: `${remToPx(2)}px`,
		height: `${type === "modal" ? window.innerHeight * 0.9 : window.innerHeight}px`,
		maxWidth: `${remToPx(28)}px`,
		margin: type === "modal" && !mediaQueryUtil("md") ? `0 ${remToPx(1)}px 0 ${remToPx(1)}px` : "0px",
		borderRadius: type === "modal" && `${remToPx(0.5)}px`,
	}) as CSSProperties;

const inset0 = {
	top: "0px",
	left: "0px",
	right: "0px",
	bottom: "0px",
};

const dialogOverlayStyles: CSSProperties = {
	zIndex: "100",
	position: "fixed",
	...inset0,
};

const dialogBackdropStyles: CSSProperties = {
	zIndex: "100",
	position: "absolute",
	backgroundColor: "rgb(0, 0, 0)",
	...inset0,
};

const dialogContainerStyles = (type: IDialogTypes = "modal") =>
	({
		display: "flex",
		position: "absolute",
		height: `${innerHeight}px`,
		alignItems: type === "modal" && "center",
		justifyContent: type === "modal" ? "center" : type === "drawer" && "flex-end",
		...inset0,
	}) as CSSProperties;

const dialogHeaderStyles: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: `${remToPx(1)}px`,
	justifyContent: "space-between",
};

const dialogBodyStyles: CSSProperties = {
	paddingRight: `${remToPx(0.5)}px`,
	display: "block",
	overflow: "hidden auto",
};

const dialogActionStyles: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: `${remToPx(1)}px`,
	justifyContent: "flex-end",
};

describe("Dialog Component", () => {
	before(() => {
		cy.viewport(1280, 720);

		cy.window().then((win) => {
			cy.wrap(win.innerHeight).as("innerHeight");
		});
	});

	it("Render correctly Dialog based on default props", () => {
		setup({ id: "test-dialog" });

		const toggleButton = cy.getByTestId("button");

		toggleButton.trigger("click");

		cy.wait(500);

		const dialogOverlay = cy.getByTestId("dialog-overlay");
		dialogOverlay.should("be.visible");
		dialogOverlay.haveCSS(dialogOverlayStyles);

		const dialogBackdrop = cy.getByTestId("dialog-backdrop");
		dialogBackdrop.should("exist");
		dialogBackdrop.haveCSS(dialogBackdropStyles);

		const dialogContainer = cy.getByTestId("dialog-container");
		dialogContainer.should("be.visible");
		dialogContainer.haveCSS(dialogContainerStyles());

		const dialog = cy.getByTestId("dialog");
		dialog.should("be.visible");
		dialog.haveCSS(defaultDialogStyles());

		const dialogHeader = cy.getByTestId("dialog-header");
		dialogHeader.should("be.visible");
		dialogHeader.haveCSS(dialogHeaderStyles);

		const dialogBody = cy.getByTestId("dialog-body");
		dialogBody.should("be.visible");
		dialogBody.haveCSS(dialogBodyStyles);

		const dialogAction = cy.getByTestId("dialog-action");
		dialogAction.should("be.visible");
		dialogAction.haveCSS(dialogActionStyles);
	});

	it("Render correctly Dialog based on type=drawer", () => {
		setup({ id: "test-dialog" });

		cy.wait(600);
	});

	it("Render correctly Dialog based on customStyles", () => {
		setup({ id: "test-dialog", styleClass: stylesProps });
	});

	it("Should correctly toggle Dialog", () => {
		setup({ id: "test-dialog" });

		const toggleButton = cy.getByTestId("button");

		toggleButton.trigger("click");

		const dialog = cy.getByTestId("dialog");

		dialog.should("be.visible");
	});
});
