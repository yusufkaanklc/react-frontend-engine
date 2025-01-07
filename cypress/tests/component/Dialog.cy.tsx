import { Button } from "@/components/Button";
import { Dialog } from "@/components/dialog/Dialog";
import { DialogAction } from "@/components/dialog/DialogAction";
import { DialogBody } from "@/components/dialog/DialogBody";
import { DialogHeader } from "@/components/dialog/DialogHeader";
import { dialogEvents } from "@/events/DialogEvents";
import type { IDialog, IDialogStyles, IDialogTypes } from "@/interfaces/components/dialog/IDialog";
import { paper } from "@/styles/tailwind/colors/Paper";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { mediaQueryUtil } from "@/utils/MediaQueryUtil";
import { remToPx } from "@/utils/RemToPx";
import type { CSSProperties } from "react";

// Burada İlgili Component dinamik proplar'la render ediliyor
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

// Özel stiller tanımlanıyor
const stylesProps: IDialogStyles = {
	dialog: {
		defaultStyleActive: true,
		customStyle: "mt-1",
	},
	header: {
		defaultStyleActive: true,
		customStyle: "mt-1",
	},
	body: {
		defaultStyleActive: true,
		customStyle: "mt-1",
	},
	action: {
		defaultStyleActive: false,
		customStyle: "mt-1",
	},
};

// Dialog stiller
const defaultDialogStyles = (type: IDialogTypes = "modal", zIndex = "101") =>
	({
		zIndex,
		backgroundColor: getCSSVariableValue(paper.level2),
		overflow: "hidden",
		padding: remToPx(1),
		display: "flex",
		flexDirection: "column",
		gap: remToPx(2),
		height: `${type === "modal" ? window.innerHeight * 0.9 : window.innerHeight}px`,
		maxWidth: remToPx(28),
		margin: type === "modal" && !mediaQueryUtil("md") ? `0px ${remToPx(1)} 0px ${remToPx(1)}` : "0px",
		borderRadius: type === "modal" ? remToPx(0.5) : "0px",
	}) as CSSProperties;

// İnset
const inset0 = {
	top: "0px",
	left: "0px",
	right: "0px",
	bottom: "0px",
};

// dialog overlay stiller
const dialogOverlayStyles: CSSProperties = {
	zIndex: "100",
	position: "fixed",
	...inset0,
};

// dialog backdrop stilleri
const dialogBackdropStyles: CSSProperties = {
	zIndex: "100",
	position: "absolute",
	backgroundColor: "rgb(0, 0, 0)",
	...inset0,
};

// dialog container stiller
const dialogContainerStyles = (type: IDialogTypes = "modal") =>
	({
		display: "flex",
		position: "absolute",
		height: `${innerHeight}px`,
		alignItems: type === "modal" && "center",
		justifyContent: type === "modal" ? "center" : type === "drawer" && "flex-end",
		...inset0,
	}) as CSSProperties;

// dialog header stiller
const dialogHeaderStyles: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: remToPx(1),
	justifyContent: "space-between",
};

// dialog body stiller
const dialogBodyStyles: CSSProperties = {
	paddingRight: remToPx(0.5),
	display: "block",
	overflow: "hidden auto",
};

// dialog action stiller
const dialogActionStyles: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: remToPx(1),
	justifyContent: "flex-end",
};

describe("Dialog Component", () => {
	beforeEach(() => {
		cy.viewport(1280, 720);

		cy.window().then((win) => {
			cy.wrap(win.innerHeight).as("innerHeight");
		});
	});

	// Varsayılan prop'lar ile render
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

	// drawer tipinde dialog renderi
	it("Render correctly Dialog based on type=drawer", () => {
		setup({ id: "test-dialog", type: "drawer" });
		const toggleButton = cy.getByTestId("button");
		toggleButton.trigger("click");
		cy.wait(500);
		const dialog = cy.getByTestId("dialog");
		dialog.should("be.visible");
		dialog.haveCSS(defaultDialogStyles("drawer"));
	});

	// Dialog toggle kontrolu
	it("Should correctly toggle Dialog", () => {
		setup({ id: "test-dialog" });
		const toggleButton = cy.getByTestId("button");
		toggleButton.trigger("click");
		const dialog = cy.getByTestId("dialog");
		dialog.should("be.visible");
	});

	// özel stiller ile Dialog render'i
	it("Render correctly Dialog based on customStyles", () => {
		setup({ id: "test-dialog", styleClass: stylesProps, isOpen: true });

		cy.wait(500);

		const dialog = cy.getByTestId("dialog");
		dialog.should("be.visible");
		dialog.haveCSS({ ...defaultDialogStyles(), margin: `${remToPx(0.25)} 0px 0px` });

		const dialogHeader = cy.getByTestId("dialog-header");
		dialogHeader.should("be.visible");
		dialogHeader.haveCSS({ ...dialogHeaderStyles, margin: `${remToPx(0.25)} 0px 0px` });

		const dialogBody = cy.getByTestId("dialog-body");
		dialogBody.should("be.visible");
		dialogBody.haveCSS({ ...dialogBodyStyles, margin: `${remToPx(0.25)} 0px 0px` });

		const dialogAction = cy.getByTestId("dialog-action");
		dialogAction.should("be.visible");
		dialogAction.haveCSS({ margin: `${remToPx(0.25)} 0px 0px` });
	});

	// Boyut propları ile Dialog render'i
	it("Render correcty Dialog based on sizes prop", () => {
		setup({ id: "test-dialog", isOpen: true, size: "sm" });
		cy.wait(500);
		const dialogSm = cy.getByTestId("dialog");
		dialogSm.should("be.visible");
		dialogSm.haveCSS({ ...defaultDialogStyles(), maxWidth: remToPx(24) });

		setup({ id: "test-dialog", isOpen: true, size: "md" });
		cy.wait(500);
		const dialogMd = cy.getByTestId("dialog");
		dialogMd.should("be.visible");
		dialogMd.haveCSS({ ...defaultDialogStyles(), maxWidth: remToPx(28) });

		setup({ id: "test-dialog", isOpen: true, size: "lg" });
		cy.wait(500);
		const dialogLg = cy.getByTestId("dialog");
		dialogLg.should("be.visible");
		dialogLg.haveCSS({ ...defaultDialogStyles(), maxWidth: remToPx(32) });

		setup({ id: "test-dialog", isOpen: true, size: "xl" });
		cy.wait(500);
		const dialogXl = cy.getByTestId("dialog");
		dialogXl.should("be.visible");
		dialogXl.haveCSS({ ...defaultDialogStyles(), maxWidth: remToPx(36) });

		setup({ id: "test-dialog", isOpen: true, size: "2xl" });
		cy.wait(500);
		const dialog2Xl = cy.getByTestId("dialog");
		dialog2Xl.should("be.visible");
		dialog2Xl.haveCSS({ ...defaultDialogStyles(), maxWidth: remToPx(42) });
	});

	// closeToClickOutside prop kontrolu
	it("Should correctly apply closeToClickOutside rule", () => {
		setup({ id: "test-dialog", isOpen: true });
		cy.wait(500);
		cy.wrap(document.body).trigger("click");
		cy.wait(500);
		cy.getByTestId("dialog").should("not.exist");

		setup({ id: "test-dialog", isOpen: true, closeToClickOutside: false });
		cy.wait(500);
		cy.wrap(document.body).trigger("click");
		cy.wait(500);
		cy.getByTestId("dialog").should("be.visible");
	});

	// Event kontrolleri
	it("Should correctly handle events", () => {
		const mockOnClosed = cy.stub();
		const mockOnOpened = cy.stub();

		setup({ id: "test-dialog", onOpened: mockOnOpened, onClosed: mockOnClosed });

		const toggleButton = cy.getByTestId("button");

		cy.wrap(mockOnOpened).should("not.have.been.called");
		cy.wrap(mockOnClosed).should("not.have.been.called");

		toggleButton.trigger("click");
		cy.wait(500);
		cy.wrap(mockOnOpened).should("have.been.calledOnce");
		cy.wrap(mockOnClosed).should("not.have.been.called");

		cy.wrap(document.body).trigger("click");
		cy.wait(500);
		cy.wrap(mockOnClosed).should("have.been.calledOnce");
		cy.wrap(mockOnOpened).should("have.been.calledOnce");
	});
});
