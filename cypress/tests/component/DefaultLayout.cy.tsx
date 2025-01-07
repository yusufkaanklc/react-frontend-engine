import { DefaultLayout } from "@/index";
import { useUIStore } from "@/stores/UIStore";
import { remToPx } from "@/utils/RemToPx";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Test setup fonksiyonu: Sidebar'ın çökme durumunu ayarlayıp gerekli mock bileşenleri yerleştirir.
const setup = (sidebarCollapsed: boolean) => {
	useUIStore.getState().setSidebarCollapsed({ isLocked: true, status: sidebarCollapsed });
	const mockSidebar = (
		<div data-testid="mock-sidebar" className="bg-red-500 w-full h-full">
			sidebar
		</div>
	);
	const mockNavbar = (
		<div data-testid="mock-navbar" className="bg-blue-500 w-full h-full">
			Navbar
		</div>
	);
	cy.mount(
		<MemoryRouter initialEntries={["/test-route"]}>
			<Routes>
				<Route path="/" element={<DefaultLayout sidebar={mockSidebar} navbar={mockNavbar} />}>
					<Route path="test-route" element={<div data-testid="mock-test-route">Test Route</div>} />
				</Route>
			</Routes>
		</MemoryRouter>,
	);
};

describe("Default Layout Component", () => {
	let innerHeight: number;
	let innerWidth: number;

	// Her testten önce ekran boyutları ayarlanır ve iç yüksekliği ile genişliği kaydedilir.
	beforeEach(() => {
		if (!Cypress.currentTest.title.includes("small screen")) {
			cy.viewport(1280, 720);
			cy.window().then((window) => {
				innerHeight = window.innerHeight;
				innerWidth = window.innerWidth;
			});
		} else {
			cy.viewport("iphone-xr");
			cy.window().then((window) => {
				innerHeight = window.innerHeight;
				innerWidth = window.innerWidth;
			});
		}
	});

	// Layout doğru şekilde render ediliyor mu?
	it("should render correctly", () => {
		setup(true);
		cy.getByTestId("default-layout")
			.should("be.visible")
			.haveCSS({
				height: `${innerHeight}px`, // Yükseklik
				overflow: "hidden auto", // Taşma
				display: "flex", // Flex düzeni
			});

		cy.getByTestId("mock-navbar").should("be.visible");
		cy.getByTestId("mock-sidebar").should("be.visible");
	});

	// Sidebar çökme durumu ile render ediliyor mu?
	it("should render correctly with collapsed sidebar", () => {
		setup(true);
		cy.getByTestId("sidebar-section")
			.should("be.visible")
			.and("have.attr", "data-sidebar-collapsed", "true") // Sidebar çökme durumu
			.haveCSS({
				position: "fixed", // Sabit konum
				top: "0px", // Üstten sıfır
				overflow: "hidden", // Taşma gizlensin
				left: "0px", // Sol sıfır
				zIndex: "60", // Z-index
				height: `${innerHeight}px`, // Yükseklik
				transform: "matrix(1, 0, 0, 1, 0, 0)", // Transform
				width: remToPx(4.5), // Genişlik
			});

		cy.getByTestId("mock-sidebar").should("be.visible");
	});

	// Küçük ekran boyutunda collapsed sidebar render ediliyor mu?
	it("should render correctly with collapsed sidebar based on small screen", () => {
		setup(true);
		cy.getByTestId("sidebar-section")
			.should("not.be.visible") // Görünmüyor olmalı
			.and("have.attr", "data-sidebar-collapsed", "true")
			.haveCSS({
				position: "fixed",
				top: "0px",
				overflow: "hidden",
				left: "0px",
				zIndex: "60",
				height: `${innerHeight}px`,
				transform: "matrix(1, 0, 0, 1, -414, 0)", // Transform
				width: `${innerWidth}px`,
			});

		cy.getByTestId("mock-sidebar").should("not.be.visible");
	});

	// Sidebar genişletildiğinde doğru şekilde render ediliyor mu?
	it("should render correctly with uncollapsed sidebar", () => {
		setup(false);
		cy.getByTestId("sidebar-section")
			.should("be.visible")
			.and("have.attr", "data-sidebar-collapsed", "false") // Sidebar açıldı
			.haveCSS({
				position: "fixed",
				top: "0px",
				overflow: "hidden",
				left: "0px",
				zIndex: "60",
				height: `${innerHeight}px`,
				transform: "matrix(1, 0, 0, 1, 0, 0)",
				width: remToPx(18), // Genişlik
			});

		cy.getByTestId("mock-sidebar").should("be.visible");
	});

	// Küçük ekran boyutunda uncollapsed sidebar doğru şekilde render ediliyor mu?
	it("should render correctly with uncollapsed sidebar based on small screen", () => {
		setup(false);
		cy.getByTestId("sidebar-section")
			.should("be.visible")
			.and("have.attr", "data-sidebar-collapsed", "false")
			.haveCSS({
				position: "fixed",
				top: "0px",
				overflow: "hidden",
				left: "0px",
				zIndex: "60",
				height: `${innerHeight}px`,
				transform: "none",
				width: `${innerWidth}px`, // Ekran genişliğine göre
			});

		cy.getByTestId("mock-sidebar").should("be.visible");
	});

	// Navbar içerik bölmesi çökme durumunda doğru şekilde render ediliyor mu?
	it("should render correctly with collapsed navbar content section", () => {
		setup(true);
		cy.getByTestId("navbar-content-section")
			.should("have.attr", "data-sidebar-collapsed", "true")
			.haveCSS({
				margin: `0px 0px 0px ${remToPx(4.5)}`, // Marjin
				display: "flex",
				flexDirection: "column", // Flex yönü
			});
	});

	// Küçük ekran boyutunda navbar içerik bölmesi çökme durumu
	it("should render correctly with collapsed navbar content section based on small screen", () => {
		setup(true);
		cy.getByTestId("navbar-content-section").should("have.attr", "data-sidebar-collapsed", "true").haveCSS({
			margin: "0px",
			display: "flex",
			flexDirection: "column",
		});
	});

	// Navbar içerik bölmesi genişletildiğinde doğru şekilde render ediliyor mu?
	it("should render correctly with uncollapsed navbar content section", () => {
		setup(false);
		cy.getByTestId("navbar-content-section")
			.should("have.attr", "data-sidebar-collapsed", "false")
			.haveCSS({
				margin: `0px 0px 0px ${remToPx(18)}`,
				display: "flex",
				flexDirection: "column",
			});
	});

	// Küçük ekran boyutunda navbar içerik bölmesi genişletildiğinde doğru şekilde render ediliyor mu?
	it("should render correctly with uncollapsed navbar content section based on small screen", () => {
		setup(false);
		cy.getByTestId("navbar-content-section").should("have.attr", "data-sidebar-collapsed", "false").haveCSS({
			margin: "0px",
			display: "flex",
			flexDirection: "column",
		});
	});

	// Navbar çökme durumu ile doğru render ediliyor mu?
	it("should render correctly with collapsed navbar", () => {
		setup(true);
		cy.getByTestId("navbar-section")
			.should("have.attr", "data-sidebar-collapsed", "true")
			.haveCSS({
				position: "fixed",
				top: "0px",
				left: remToPx(4.5), // Sağda ve solda mesafe
				zIndex: "50",
				right: "0px",
				height: remToPx(4.5),
			});
	});

	// Küçük ekran boyutunda collapsed navbar
	it("should render correctly with collapsed navbar based on small screen", () => {
		setup(true);
		cy.getByTestId("navbar-section")
			.should("have.attr", "data-sidebar-collapsed", "true")
			.haveCSS({
				position: "fixed",
				top: "0px",
				left: "0px",
				zIndex: "50",
				right: "0px",
				height: remToPx(4.5),
			});
	});

	// Uncollapsed navbar render ediliyor mu?
	it("should render correctly with uncollapsed navbar", () => {
		setup(false);
		cy.getByTestId("navbar-section")
			.should("have.attr", "data-sidebar-collapsed", "false")
			.haveCSS({
				position: "fixed",
				top: "0px",
				left: remToPx(18), // Sol mesafe
				zIndex: "50",
				right: "0px",
				height: remToPx(4.5),
			});
	});

	// Küçük ekran boyutunda uncollapsed navbar render ediliyor mu?
	it("should render correctly with uncollapsed navbar based on small screen", () => {
		setup(false);
		cy.getByTestId("navbar-section")
			.should("have.attr", "data-sidebar-collapsed", "false")
			.haveCSS({
				position: "fixed",
				top: "0px",
				left: "0px",
				zIndex: "50",
				right: "0px",
				height: remToPx(4.5),
			});
	});

	// Content section doğru şekilde render ediliyor mu?
	it("should render correctly content-section", () => {
		setup(true);
		cy.getByTestId("content-section")
			.should("be.visible")
			.haveCSS({
				margin: `${remToPx(6.5)} 0px 0px`,
				padding: `0px ${remToPx(3.5)} ${remToPx(2.5)}`, // Padding ayarları
			});

		cy.getByTestId("mock-test-route").should("be.visible");
	});

	// Küçük ekran boyutunda content section render ediliyor mu?
	it("should render correctly content-section based on small screen", () => {
		setup(true);
		cy.getByTestId("content-section")
			.should("be.visible")
			.haveCSS({
				margin: `${remToPx(6.5)} 0px 0px`,
				padding: `0px ${remToPx(1)} ${remToPx(2.5)}`, // Padding ayarları
			});

		cy.getByTestId("mock-test-route").should("be.visible");
	});
});
