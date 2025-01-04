import { SplitLayout } from "@/components/layouts/SplitLayout";
import type { ISplitLayout } from "@/interfaces/components/layouts/ISplitLayout";
import { useThemeStore } from "@/stores/ThemeStore";
import { color } from "@/styles/tailwind/colors/Color";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const setTheme = useThemeStore.getState().setTheme;

// Test senaryolarında kullanılacak olan layout'u ayarlayan fonksiyon
const setup = (direction?: ISplitLayout["direction"]) => {
	cy.mount(
		<MemoryRouter initialEntries={["/test-route"]}>
			<Routes>
				<Route
					path="/"
					element={
						<SplitLayout
							direction={direction} // Layout yönünü parametre olarak alıyoruz
							title="Test Title" // Başlık metni
							subtitle="Test Subtitle" // Alt başlık metni
							image="./cypress/fixtures/files/file-valid.png" // Görselin kaynağı
						/>
					}
				>
					<Route path="test-route" element={<div data-testid="mock-test-route">Test Route</div>} />
				</Route>
			</Routes>
		</MemoryRouter>,
	);
};

// Temalar için arka plan renkleri
const lightBg =
	'rgba(0, 0, 0, 0) url("http://localhost:5173/__cypress/src/public/media/split-layout/bg-light.jpeg") repeat fixed 50% 50% / cover padding-box border-box';

const darkBg =
	'rgba(0, 0, 0, 0) url("http://localhost:5173/__cypress/src/public/media/split-layout/bg-dark.jpeg") repeat fixed 50% 50% / cover padding-box border-box';

describe("Split Layout Component", () => {
	let innerHeight: number;
	let innerWidth: number;

	// Test başlamadan önce viewport boyutlarını ayarlıyoruz
	beforeEach(() => {
		// Eğer test küçük ekran testlerinden biri değilse normal ekran boyutunda (1280x720) test yapıyoruz
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
				innerWidth = window.innerWidth - 6;
			});
		}
	});

	// Işık temasına göre layout'un doğru render edilip edilmediğini test ediyoruz
	it("should render correctly based on light theme", () => {
		setTheme("light");

		setup();

		cy.getByTestId("split-layout").haveCSS({
			display: "flex",
			width: `${innerWidth}px`,
			height: `${innerHeight}px`,
			flexDirection: "row",
			alignItems: "center",
			background: lightBg,
		});
	});

	// Küçük ekran boyutunda ışık temasına göre doğru render edilip edilmediğini test ediyoruz
	it("should render correctly on small screen with light theme", () => {
		setTheme("light");

		setup();

		// Küçük ekran boyutlarıyla ilgili stil kontrolleri
		cy.getByTestId("split-layout").haveCSS({
			display: "flex",
			width: `${innerWidth}px`,
			height: "1147px",
			flexDirection: "column",
			alignItems: "center",
			background: lightBg,
		});
	});

	// Karanlık temasına göre layout'un doğru render edilip edilmediğini test ediyoruz
	it("should render correctly based on dark theme", () => {
		setTheme("dark");

		setup();

		cy.getByTestId("split-layout").haveCSS({
			display: "flex",
			width: `${innerWidth}px`,
			height: `${innerHeight}px`,
			flexDirection: "row",
			alignItems: "center",
			background: darkBg,
		});
	});

	// Küçük ekran boyutunda karanlık temasına göre doğru render edilip edilmediğini test ediyoruz
	it("should render correctly on small screen with dark theme", () => {
		setTheme("dark");

		setup();

		// Küçük ekran boyutlarıyla ilgili stil kontrolleri
		cy.getByTestId("split-layout").haveCSS({
			display: "flex",
			width: `${innerWidth}px`,
			height: "1147px",
			flexDirection: "column",
			alignItems: "center",
			background: darkBg,
		});
	});

	// Sol konteynerdeki resmin doğru şekilde render edildiğini test ediyoruz
	it("should correctly render the image in the left container", () => {
		setTheme("light");

		setup();

		// Sol konteynerdeki resmin doğru şekilde görüntülendiğini kontrol ediyoruz
		cy.getByTestId("left-container")
			.find("img")
			.should("have.attr", "src", "./cypress/fixtures/files/file-valid.png") // Resim kaynağını kontrol ediyoruz
			.and("have.attr", "alt", "Test Title"); // Resmin alt metninin doğru olduğunu kontrol ediyoruz
	});

	// Başlık ve alt başlık metinlerinin doğru render edildiğini test ediyoruz
	it("should correctly render title and subtitle text", () => {
		setTheme("light");

		setup();

		// Başlık metninin doğru olduğunu ve stilinin doğru olduğunu kontrol ediyoruz
		cy.getByTestId("title")
			.should("have.text", "Test Title")
			.haveCSS({
				color: getCSSVariableValue(color.primary), // Rengin doğru olduğunu kontrol ediyoruz
			});

		// Alt başlık metninin doğru olduğunu ve stilinin doğru olduğunu kontrol ediyoruz
		cy.getByTestId("subtitle").should("have.text", "Test Subtitle").haveCSS({
			opacity: "0.7", // Opaklık değerinin doğru olduğunu kontrol ediyoruz
		});
	});

	// Yön bazında layout'un doğru render edilip edilmediğini test ediyoruz
	it("should render the correct order based on direction", () => {
		setTheme("light");

		// Normal yön testini yapıyoruz
		setup("normal");

		// Sol konteynerin sırasının 1 olması gerektiğini kontrol ediyoruz
		cy.getByTestId("left-container").haveCSS({
			order: "1",
		});
		// İçerik konteynerinin sırasının 2 olması gerektiğini kontrol ediyoruz
		cy.getByTestId("content-container").haveCSS({
			order: "2",
		});

		// Reverse yön testini yapıyoruz
		setup("reverse");

		// Sol konteynerin sırasının 2 olması gerektiğini kontrol ediyoruz
		cy.getByTestId("left-container").haveCSS({
			order: "2",
		});
		// İçerik konteynerinin sırasının 1 olması gerektiğini kontrol ediyoruz
		cy.getByTestId("content-container").haveCSS({
			order: "1",
		});
	});

	// Additional test for small and medium screen sizes
	it("should render correctly on small screens", () => {
		setTheme("light");
		setup();

		cy.getByTestId("split-layout").should("have.css", "flexDirection", "column");

		// Add further checks specific to small screen devices here
		cy.getByTestId("left-container").should("exist");
		cy.getByTestId("content-container").should("exist");
	});
});
