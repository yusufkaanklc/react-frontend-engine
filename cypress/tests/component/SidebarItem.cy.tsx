import { sidebarMenus } from "#/cypress/fixtures/stories/SidebarMenus";
import { SidebarItem } from "@/components/sidebar/SidebarItem";
import type { ISidebarItem } from "@/interfaces/components/sidebar/ISidebarItem";
import type { ISidebarMenuItem } from "@/interfaces/components/sidebar/ISidebarMenu";
import { useUIStore } from "@/stores/UIStore";
import { primary } from "@/styles/tailwind/colors/Primary";
import { sidebar } from "@/styles/tailwind/colors/Sidebar";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";

// Test kurulumu için yardımcı fonksiyon
const setup = (props: ISidebarItem) => {
	cy.mount(<SidebarItem {...props} />);
};

describe("SidebarItem", () => {
	beforeEach(() => {});

	// Kenar çubuğu öğe konteyneri testleri
	context("Sidebar Item Container", () => {
		// Konteynerin temel görünüm ve stil testleri
		it("should render correctly", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem });

			const sidebarItemContainer = cy.getByTestId("sidebar-item-container");
			sidebarItemContainer.should("be.visible").haveCSS({
				display: "flex",
				alignItems: "center",
				gap: remToPx(0.5),
			});
		});
	});

	// Kenar çubuğu alt öğe nokta göstergesi testleri
	context("Sidebar Item Child Dot", () => {
		// Alt öğe noktasının varsayılan durumunu kontrol eder
		it("should render correctly", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem });

			cy.getByTestId("sidebar-item-child-dot")
				.should("not.be.visible")
				.and("have.attr", "data-activated", "false")
				.and("have.attr", "data-is-child", "false");
		});

		// Alt öğe olduğunda noktanın görünümünü doğrular
		it("should render correctly when isChild is true", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem, isChild: true });

			cy.getByTestId("sidebar-item-child-dot")
				.should("be.visible")
				.and("have.attr", "data-activated", "false")
				.and("have.attr", "data-is-child", "true")
				.haveCSS({
					display: "block",
					borderColor: getCSSVariableValue(primary.main),
					borderWidth: "1px",
					borderRadius: "9999px",
				});
		});

		// Aktif durumdaki nokta görünümünü kontrol eder
		it("should render correctly when isActivated is true", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem, isActivated: true, isChild: true });

			cy.getByTestId("sidebar-item-child-dot")
				.should("be.visible")
				.and("have.attr", "data-activated", "true")
				.and("have.attr", "data-is-child", "true")
				.haveCSS({
					backgroundColor: getCSSVariableValue(primary.main),
				});
		});
	});

	// Ana kenar çubuğu öğesi testleri
	context("Sidebar Item", () => {
		// Varsayılan görünüm ve stilleri test eder
		it("should render correctly", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem });

			cy.getByTestId("sidebar-item")
				.should("be.visible")
				.and("have.attr", "data-activated", "false")
				.and("have.attr", "data-is-child", "false")
				.and("have.class", "hover:text-sidebar-item-active-color", "data-[activated='false']:hover:bg-sidebar-item-hover")
				.haveCSS({
					display: "flex",
					borderRadius: remToPx(0.5),
					alignItems: "center",
					overflow: "hidden",
					padding: `${remToPx(0.625)} ${remToPx(0.5)}`,
					margin: `${remToPx(0.25)} 0px ${remToPx(1)}`,
					color: getCSSVariableValue(sidebar["item-color"]),
				});
		});

		// Aktif durumdaki görünümü kontrol eder
		it("should render correctly when isActivated is true", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem, isActivated: true });

			cy.getByTestId("sidebar-item")
				.should("be.visible")
				.and("have.attr", "data-activated", "true")
				.and("have.attr", "data-is-child", "false")
				.haveCSS({
					color: getCSSVariableValue(sidebar["item-active-color"]),
					backgroundColor: getCSSVariableValue(sidebar["item-active"]),
				});
		});

		// Alt öğe olarak görünümü test eder
		it("should render correctly when isChild is true", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem, isChild: true });

			cy.getByTestId("sidebar-item")
				.should("be.visible")
				.and("have.attr", "data-activated", "false")
				.and("have.attr", "data-is-child", "true")
				.haveCSS({
					margin: "0px",
				});
		});
	});

	// Kenar çubuğu öğe ikonu testleri
	context("Sidebar Item Icon", () => {
		// İkonun varlığını ve görünümünü kontrol eder
		it("should render correctly when menu.icon is not null", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem, isChild: true });

			cy.getByTestId("icon-box")
				.should("be.visible")
				.and("have.attr", "data-activated", "false")
				.and("have.class", "hover:text-sidebar-item-active-color");
			cy.getByTestId("icon-box").find("svg").should("be.visible");
		});

		// Aktif durumdaki ikon stillerini test eder
		it("should render correctly when isActivated is true", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem, isActivated: true });

			cy.getByTestId("icon-box")
				.should("be.visible")
				.and("have.attr", "data-activated", "true")
				.haveCSS({
					color: getCSSVariableValue(sidebar["item-active-color"]),
				});
		});
	});

	// Kenar çubuğu öğe metni testleri
	context("Sidebar Item Text", () => {
		// Metin öğesinin görünüm ve stillerini kontrol eder
		it("should render correctly when menu.text is not null", () => {
			setup({ menu: sidebarMenus[0] as ISidebarMenuItem });

			cy.getByTestId("sidebar-item-text").should("be.visible").and("have.attr", "data-sidebar-collapsed");
			cy.getByTestId("sidebar-item-text").haveCSS({
				textWrap: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				lineHeight: "20px",
				opacity: "1",
				marginLeft: remToPx(1),
				transformOrigin: "0px 10px",
				transform: "none",
				margin: `0px 0px 0px ${remToPx(1)}`,
			});
		});

		// Daraltılmış kenar çubuğunda metin görünümünü test eder
		it("should render correctly when sidebarCollapsed is true", () => {
			cy.viewport(1280, 720);

			useUIStore.getState().setSidebarCollapsed({ isLocked: true, status: true });

			setup({ menu: sidebarMenus[0] as ISidebarMenuItem });

			cy.getByTestId("sidebar-item-text")
				.should("have.attr", "data-sidebar-collapsed", "true")
				.and("have.text", sidebarMenus[0].text)
				.haveCSS({
					transform: "matrix(0, 0, 0, 1, 0, 0)",
					opacity: "0",
					margin: "0px",
				});
		});
	});
});
