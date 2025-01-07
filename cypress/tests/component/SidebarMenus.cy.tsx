import { sidebarMenus } from "#/cypress/fixtures/stories/SidebarMenus";
import { SidebarMenus } from "@/components/sidebar/SidebarMenus";
import { useUIStore } from "@/stores/UIStore";
import { sidebar } from "@/styles/tailwind/colors/Sidebar";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";
import { MemoryRouter } from "react-router-dom";

// Test kurulumu için yardımcı fonksiyon
const setup = () => {
	cy.mount(
		<MemoryRouter initialEntries={["/"]}>
			<SidebarMenus menus={sidebarMenus} />
		</MemoryRouter>,
	);
};

const setSidebarCollapsed = useUIStore.getState().setSidebarCollapsed;

describe("SidebarMenus", () => {
	beforeEach(() => {
		if (Cypress.currentTest.title.includes("small screen")) {
			cy.viewport(375, 667);
		} else {
			cy.viewport(1280, 720);
		}

		setup();
	});

	// Etiket menü öğeleri testleri
	context("Label Menu Items", () => {
		// Etiket menüsünün temel görünümünü test eder
		it("should render label menu correctly", () => {
			setSidebarCollapsed({ isLocked: true, status: false });

			cy.wait(500);

			cy.getByTestId("label-menu")
				.should("be.visible")
				.and("have.class", "text-sidebar-group-title-color")
				.haveCSS({
					color: getCSSVariableValue(sidebar["group-title-color"]),
					opacity: "1",
					lineHeight: "20px",
				});
		});

		// Kenar çubuğu daraltıldığında etiket menüsünün görünmezliğini test eder
		it("should hide label menu when sidebar is collapsed", () => {
			useUIStore.getState().setSidebarCollapsed({ isLocked: true, status: true });

			cy.getByTestId("label-menu").should("not.exist");
		});
	});

	// Açılır menü testleri
	context("Dropdown Menu", () => {
		// Açılır menünün temel görünümünü test eder
		it("should render dropdown menu correctly", () => {
			setSidebarCollapsed({ isLocked: true, status: false });

			cy.getByTestId("dropdown-menu")
				.should("be.visible")
				.and("have.class", "group")
				.haveCSS({
					marginBottom: remToPx(1),
				});
		});

		// Açılır menü tetikleyicisinin görünümünü test eder
		it("should render dropdown menu trigger correctly", () => {
			cy.getByTestId("dropdown-menu-trigger")
				.should("be.visible")
				.should("have.attr", "data-activated", "false")
				.should("have.class", "hover:bg-sidebar-item-hover")
				.should("have.class", "data-[activated='true']:text-sidebar-item-active-color")
				.should("have.class", "data-[activated='false']:text-sidebar-item-color")
				.should("have.class", "data-[activated='true']:bg-primary-main")
				.should("have.class", "data-[activated='false']:hover:text-sidebar-item-active-color")
				.haveCSS({
					display: "flex",
					cursor: "pointer",
					alignItems: "center",
					borderRadius: remToPx(0.5),
					justifyContent: "space-between",
					padding: `${remToPx(0.625)} ${remToPx(0.5)}`,
					margin: `${remToPx(0.25)} 0px`,
					color: getCSSVariableValue(sidebar["item-color"]),
				});
		});

		// Açılır menü ikonunun görünümünü test eder
		it("should render dropdown menu icon correctly", () => {
			cy.getByTestId("icon-box")
				.should("be.visible")
				.and("have.class", "hover:text-sidebar-item-active-color")
				.haveCSS({
					color: getCSSVariableValue(sidebar["item-color"]),
				});

			cy.getByTestId("icon-box").find("svg").should("be.visible");
		});

		// Açılır menü metninin görünümünü test eder
		it("should render dropdown menu text correctly", () => {
			cy.getByTestId("dropdown-menu-trigger-text")
				.should("be.visible")
				.and("have.attr", "data-sidebar-collapsed", "false")
				.haveCSS({
					textWrap: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					lineHeight: "20px",
					opacity: "1",
					marginLeft: remToPx(1),
				});
		});

		// Açılır menü ok ikonunun görünümünü test eder
		it("should render dropdown menu chevron icon correctly", () => {
			cy.getByTestId("dropdown-menu-trigger-chevron-icon")
				.should("be.visible")
				.and("have.attr", "data-sidebar-collapsed", "false")
				.and("have.class", "transform", "data-[sidebar-collapsed='false']:group-open:-rotate-180")
				.haveCSS({
					flexShrink: "0",
					width: remToPx(1),
					height: remToPx(1),
				});
		});

		// Açılır menü listesinin görünümünü test eder
		it("should render dropdown menu list correctly", () => {
			cy.getByTestId("dropdown-menu-list")
				.should("be.visible")
				.and("have.class", "text-sidebar-item-color")
				.haveCSS({
					marginTop: remToPx(0.5),
					padding: `0px 0px 0px ${remToPx(0.79)}`,
					color: getCSSVariableValue(sidebar["item-color"]),
				});
		});
	});

	// Normal menü öğeleri testleri
	context("Regular Menu Items", () => {
		// Normal menü öğesinin temel görünümünü test eder
		it("should render regular menu item correctly", () => {
			cy.getByTestId("menu")
				.should("be.visible")
				.find("[data-testid='sidebar-item']")
				.should("have.attr", "data-activated", "false")
				.and("have.class", "hover:text-sidebar-item-active-color");
		});
	});
});
