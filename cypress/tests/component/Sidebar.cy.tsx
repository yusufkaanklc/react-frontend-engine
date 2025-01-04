import { sidebarMenus } from "#/cypress/fixtures/stories/SidebarMenus";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useUIStore } from "@/stores/UIStore";
import { custom } from "@/styles/tailwind/colors/Custom";
import { sidebar } from "@/styles/tailwind/colors/Sidebar";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";
import { MemoryRouter } from "react-router-dom";

// Test kurulumu için yardımcı fonksiyon
const setup = () => {
	cy.mount(
		<MemoryRouter>
			<Sidebar
				menus={sidebarMenus}
				logo="./cypress/fixtures/images/logo.png"
				collapsedLogo="./cypress/fixtures/images/logo-small.png"
			/>
		</MemoryRouter>,
	);
};

const setSidebarCollapsed = useUIStore.getState().setSidebarCollapsed;

describe("Sidebar", () => {
	let innerHeight: number;

	// Her test öncesi çalışacak hazırlık
	beforeEach(() => {
		// Ekran boyutunu ayarla
		if (Cypress.currentTest.title.includes("small screen")) {
			cy.viewport(550, 750);
		} else {
			cy.viewport(1280, 720);
		}

		// Pencere yüksekliğini al
		cy.window().then((win) => {
			innerHeight = win.innerHeight;
		});

		// Kenar çubuğunu açık duruma getir
		setSidebarCollapsed({ isLocked: false, status: false });

		setup();
	});

	// Ana kenar çubuğu stil testleri
	it("should render correctly", () => {
		cy.getByTestId("sidebar").haveCSS({
			height: `${innerHeight}px`,
			display: "flex",
			flexDirection: "column",
			gap: `${remToPx(2.5)}px`,
			padding: `${remToPx(1.5)}px 0px`,
			overflow: "hidden",
			borderColor: getCSSVariableValue(custom["card-border"]),
			backgroundColor: getCSSVariableValue(sidebar.default),
		});
	});

	// Kenar çubuğı başlık bölümü testleri
	context("sidebar header", () => {
		// Normal durumdaki başlık testi
		it("should render correctly sidebar header", () => {
			cy.getByTestId("sidebar-header").should("be.visible").and("have.attr", "data-sidebar-collapsed", "false").haveCSS({
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			});

			cy.getByTestId("sidebar-logo").should("be.visible").and("have.attr", "src", "./cypress/fixtures/images/logo.png");

			cy.getByTestId("sidebar-collapsed-trigger")
				.should("be.visible")
				.haveCSS({
					width: `${remToPx(1.25)}px`,
					height: `${remToPx(1.25)}px`,
					cursor: "pointer",
					color: getCSSVariableValue(sidebar["item-active-color"]),
				});
		});

		// Daraltılmış durumdaki başlık testi
		it("should render correctly sidebar header collapsed", () => {
			setSidebarCollapsed({ isLocked: false, status: true });
			cy.getByTestId("sidebar-header").should("be.visible").and("have.attr", "data-sidebar-collapsed", "true").haveCSS({
				justifyContent: "center",
				display: "flex",
				alignItems: "center",
			});

			cy.getByTestId("sidebar-collapsed-logo")
				.should("be.visible")
				.and("have.attr", "src", "./cypress/fixtures/images/logo-small.png");

			cy.getByTestId("sidebar-collapsed-trigger").should("not.exist");
		});
	});

	// Menü listesi testi
	it("should render correctly sidebar menu list", () => {
		cy.getByTestId("sidebar-menu-list")
			.should("be.visible")
			.haveCSS({ overflowX: "hidden", overflowY: "auto", padding: `0px ${remToPx(1)}px` });
	});
});
