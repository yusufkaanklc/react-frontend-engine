import { userMenuData } from "#/cypress/fixtures/stories/UserMenuData";
import { Navbar } from "@/components/navbar/Navbar";
import { useThemeStore } from "@/index";
import type { INavbar } from "@/interfaces/components/navbar/INavbar";
import type { ITheme } from "@/interfaces/types/ITheme";
import { color } from "@/styles/tailwind/colors/Color";
import { common } from "@/styles/tailwind/colors/Common";
import { sidebar } from "@/styles/tailwind/colors/Sidebar";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { remToPx } from "@/utils/RemToPx";

// Navbar componentini test etmek için setup fonksiyonu
const setup = (props: INavbar, theme: ITheme = "dark") => {
	// Tema durumunu günceller
	useThemeStore.getState().setTheme(theme);
	// Navbar bileşenini mount eder
	cy.mount(<Navbar {...props} />);
};

// Navbar için ortak CSS stilleri
const commonNavbarCSS = {
	height: "40px",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: `${remToPx(1)}px`,
};

// Navbar test senaryoları
describe("Navbar", () => {
	// Temel render işlemleri için testler
	context("Basic rendering", () => {
		it("renders correctly on large screens", () => {
			// Büyük ekran boyutu belirlenir
			cy.viewport(1280, 720);
			setup({});
			// Navbar bileşeni doğru şekilde render edilip edilmediği kontrol edilir
			cy.getByTestId("navbar")
				.should("be.visible")
				.haveCSS({
					...commonNavbarCSS,
					backgroundColor: getCSSVariableValue(sidebar.default),
					padding: `0px ${remToPx(2.5)}px`,
				});
		});

		it("renders correctly with light theme", () => {
			// Tema light olarak ayarlanır
			cy.viewport(1280, 720);
			setup({}, "light");
			// Navbar bileşeninin light tema ile doğru şekilde render edilip edilmediği kontrol edilir
			cy.getByTestId("navbar").haveCSS({
				...commonNavbarCSS,
				backgroundColor: getCSSVariableValue(common.white),
				padding: `0px ${remToPx(2.5)}px`,
			});
		});

		it("renders correctly on small screens", () => {
			// Küçük ekran testi için setup
			setup({});
			// Navbar bileşeni doğru şekilde render edilip edilmediği kontrol edilir
			cy.getByTestId("navbar").haveCSS({
				...commonNavbarCSS,
				backgroundColor: getCSSVariableValue(sidebar.default),
				padding: `0px ${remToPx(1)}px`,
			});
		});
	});

	// Mobil menü tetikleyicisi için testler
	context("Mobile menu trigger", () => {
		it("renders the trigger correctly", () => {
			setup({});
			// Mobil menü tetikleyicisinin doğru şekilde render edildiği kontrol edilir
			cy.getByTestId("icon-box")
				.find("svg")
				.should("be.visible")
				.haveCSS({
					color: getCSSVariableValue(color.primary),
					display: "block",
				});
		});

		it("hides the trigger on small screens", () => {
			// Küçük ekran boyutunda tetikleyicinin gizlendiği kontrol edilir
			cy.viewport("ipad-mini");
			setup({});
			cy.getByTestId("mobile-menu-trigger").should("not.be.visible");
		});
	});

	// Arama girişi için testler
	context("Search input", () => {
		it("renders correctly on large screens", () => {
			// Büyük ekran boyutunda arama girişinin doğru render edilmesi
			cy.viewport(1280, 720);
			setup({});
			cy.getByTestId("search-input-label").should("be.visible");
			cy.getByTestId("search-input");
			cy.getByTestId("search-input-label").find("svg").should("be.visible");
		});

		it("hides the label on small screens", () => {
			// Küçük ekran boyutunda arama giriş etiketi gizlenir
			setup({});
			cy.getByTestId("search-input");
			cy.getByTestId("search-input-label").should("not.be.visible");
		});
	});

	// Tema değiştirici testleri
	context("Theme changer", () => {
		it("toggles between themes correctly", () => {
			// Tema değiştiricinin doğru çalışıp çalışmadığı test edilir
			setup({ isThemeSwitcherActive: true }, "light");
			cy.getByTestId("sun-icon").should("be.visible");
			cy.getByTestId("moon-icon").should("not.exist");
			cy.getByTestId("sun-icon").click();
			cy.getByTestId("moon-icon").should("be.visible");
			cy.getByTestId("sun-icon").should("not.exist");
		});
	});

	// Bildirimlerin doğru render edilmesi
	context("Notifications", () => {
		it("renders correctly", () => {
			setup({ notifications: true });
			cy.getByTestId("notifications").should("be.visible");
		});
	});

	// Dil değiştirici testleri
	context("Language changer", () => {
		it("renders correctly", () => {
			setup({});
			cy.getByTestId("language-changer").should("be.visible");
		});
	});

	// Kullanıcı menüsü için testler
	context("User menu", () => {
		it("renders correctly on large screens", () => {
			// Büyük ekran boyutunda kullanıcı menüsü doğru şekilde render edilir
			cy.viewport(1280, 720);
			setup({ userMenuData });
			cy.getByTestId("user-menu").should("be.visible");
		});

		it("hides the menu on small screens", () => {
			// Küçük ekran boyutunda kullanıcı menüsü gizlenir
			cy.viewport("iphone-xr");
			setup({ userMenuData });
			cy.getByTestId("user-menu").should("not.be.visible");
		});
	});

	// Ekstra bileşenlerin doğru render edilmesi
	context("Extra components", () => {
		it("renders correctly when provided", () => {
			setup({
				extraComponents: [
					<div key="1" data-testid="extra-component">
						Extra Component
					</div>,
				],
			});
			cy.getByTestId("extra-component").should("be.visible");
		});
	});
});
