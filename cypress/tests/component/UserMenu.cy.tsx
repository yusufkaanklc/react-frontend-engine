import { userMenuData } from "#/cypress/fixtures/stories/UserMenuData";
import { UserMenu } from "@/components/navbar/UserMenu";
import type { IUserMenuData } from "@/interfaces/components/navbar/INavbar";

// Test setup fonksiyonu, UserMenu bileşenini mount etmek için kullanılır.
const setup = (data: IUserMenuData) => {
	cy.mount(
		<div className="flex items-center justify-center">
			<UserMenu data={data} />
		</div>,
	);
};

describe("UserMenu", () => {
	context("Rendering", () => {
		it("doğru şekilde render ediyor", () => {
			setup(userMenuData);

			// Menü öğesinin görünür olduğunu kontrol et
			cy.getByTestId("user-menu").should("be.visible");
			// Avatar'ın doğru 'src' attribute'una sahip olduğunu kontrol et
			cy.getByTestId("avatar-image").should("have.attr", "src", userMenuData.avatar);
			// Başlangıçta menü kapalı olmalı, bu yüzden kullanıcı adı görünmemeli
			cy.contains(userMenuData.username).should("not.exist");
		});
	});

	context("Dropdown işlevselliği", () => {
		it("tıklandığında dropdown menüsünü açar", () => {
			setup(userMenuData);

			// Avatar'a tıklayarak menüyü açıyoruz
			cy.getByTestId("avatar").click();
			// Menü açıldığında kullanıcı adı görünür olmalı
			cy.contains(userMenuData.username).should("be.visible");
			// E-posta, Bildirimler ve Ayarlar seçeneklerinin de görünür olması gerekir
			cy.contains(userMenuData.email).should("be.visible");
			cy.contains("Notifications").should("be.visible");
			cy.contains("Settings").should("be.visible");
		});

		it("menü dışında bir yere tıklanırsa dropdown kapanmalı", () => {
			setup(userMenuData);

			// Avatar'a tıklayarak menüyü açıyoruz
			cy.getByTestId("avatar-image").click();
			// Menü açıldıktan sonra kullanıcı adı görünür olmalı
			cy.contains(userMenuData.username).should("be.visible");
			// Sayfanın herhangi bir yerine tıklayarak menüyü kapatıyoruz
			cy.get("body").click(0, 0);
			// Menü kapandıktan sonra kullanıcı adı görünmemeli
			cy.contains(userMenuData.username).should("not.exist");
		});
	});
});
