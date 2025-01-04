// Gerekli importlar
import { Breadcrumb } from "@/components/Breadcrumb";
import { icons } from "@/index";
import { remToPx } from "@/utils/RemToPx";
import "cypress-real-events";
import { Navigate, Outlet, RouterProvider, createMemoryRouter } from "react-router-dom";

// Test kurulumu için yardımcı fonksiyon
const setup = () => {
	// Test için sahte router oluşturma
	const router = createMemoryRouter([
		// Ana sayfaya yönlendirme
		{ path: "/", element: <Navigate to={"/home/dashboard"} /> },
		{
			path: "/home",
			// Breadcrumb için gerekli meta veriler
			handle: {
				crumb: {
					title: "Home",
					path: "/home",
					icon: icons.outline.check,
				},
			},
			element: <Outlet />,
			children: [
				{
					path: "dashboard",
					// Dashboard sayfası için breadcrumb meta verileri
					handle: {
						crumb: {
							title: "Dashboard",
							path: "/dashboard",
							icon: icons.outline.bell,
						},
					},
					// Test için breadcrumb'ı merkeze alan container
					element: (
						<div className="flex items-center justify-center h-screen ">
							<Breadcrumb />
						</div>
					),
				},
			],
		},
	]);

	cy.mount(<RouterProvider router={router} />);
};

describe("Breadcrumb Component", () => {
	// Her test öncesi kurulumu çalıştır
	beforeEach(() => {
		setup();
	});

	describe("Breadcrumb", () => {
		context("Rendering", () => {
			it("should display the breadcrumb component with correct styles", () => {
				// Breadcrumb'ın varlığını kontrol et
				cy.getByTestId("breadcrumb").should("be.visible");

				// Breadcrumb öğelerinin stil özelliklerini doğrula
				cy.getByTestId("breadcrumb-item")
					.should("have.length", 2)
					.find("div")
					.haveCSS({
						display: "flex",
						gap: `${remToPx(0.25)}px`,
						alignItems: "center",
						opacity: "0.7",
					});

				// Metin içeriklerini kontrol et
				cy.contains("Home").should("be.visible");
				cy.contains("Dashboard").should("be.visible");
			});

			// Hover efektini test et
			it("should show correct hover effect", () => {
				cy.getByTestId("breadcrumb-item").first().realHover().wait(300).haveCSS({
					opacity: "1",
				});
			});

			// İkonların doğru render edildiğini kontrol et
			it("should correctly render the breadcrumb with icon", () => {
				cy.getByTestId("breadcrumb-item").each((item) => {
					cy.wrap(item).find("div").find("svg").should("be.visible");
				});
			});

			// Ok işaretinin doğru render edildiğini kontrol et
			it("should render correctly arrow", () => {
				cy.getByTestId("breadcrumb-arrow").should("have.length", 1).find("svg").should("be.visible");
			});
		});

		context("Navigation", () => {
			// Link hedeflerinin doğruluğunu kontrol et
			it("should have correct href attributes", () => {
				cy.getByTestId("breadcrumb-link").first().should("have.attr", "href", "/home");
				cy.getByTestId("breadcrumb-link").last().should("have.attr", "href", "/dashboard");
			});
		});
	});
});
