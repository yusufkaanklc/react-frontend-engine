import {
	type IExampleFormDataType,
	exampleFormButtons,
	exampleFormData,
	exampleFormSchema,
	initialValues,
} from "#/cypress/fixtures/stories/FormStory";
import { FormCreator, icons } from "@/index";
import type { IFormCreator } from "@/interfaces/components/form/IFormCreator";
import { remToPx } from "@/utils/RemToPx";

const setup = (props: IFormCreator<IExampleFormDataType>) => {
	// FormCreator bileşenini montajlamak için yardımcı fonksiyon
	cy.mount(<FormCreator<IExampleFormDataType> {...props} />);
};

let onSubmitMock: sinon.SinonStub;
let onChangeMock: sinon.SinonStub;

describe("FormCreator Component", () => {
	before(() => {
		// Test başlamadan önce mock fonksiyonlarını başlatıyoruz
		onChangeMock = cy.stub();
		onSubmitMock = cy.stub();
	});

	beforeEach(() => {
		// Her test öncesinde ekran boyutunu ayarlayıp mock fonksiyonlarını sıfırlıyoruz
		cy.viewport(1280, 720);
		onChangeMock.resetHistory();
		onSubmitMock.resetHistory();
	});

	it("Render correctly form based on default props", () => {
		// FormCreator bileşenini varsayılan props ile render ediyoruz
		setup({ fields: exampleFormData, onSubmit: onSubmitMock, validationSchema: exampleFormSchema, buttons: exampleFormButtons });

		// FormCreator bileşeninin düzgün render edildiğini kontrol ediyoruz
		const formCreator = cy.getByTestId("card");
		formCreator.should("be.visible");

		// Form başlığının olmadığına emin oluyoruz
		const formHeader = cy.getByTestId("card-header");
		formHeader.should("not.exist");

		// Form gövdesinin doğru şekilde render edildiğini kontrol ediyoruz
		const formBody = cy.getByTestId("card-body");
		formBody.should("be.visible");
		formBody.haveCSS({
			display: "flex",
			flexDirection: "column",
			gap: remToPx(1.25),
		});

		// "combined-field" elemanının doğru şekilde render edildiğini kontrol ediyoruz
		const combinedField = cy.getByTestId("combined-field");
		combinedField.should("have.length", 1);
		combinedField.find("input").should("have.length", 2);

		// Form kontrolünde yıldız işaretlerinin (zorunlu alanlar) olduğunu kontrol ediyoruz
		const formControlAsterisks = cy.getByTestId("form-control-asterisk");
		formControlAsterisks.should("have.length", 3);

		// Giriş alanlarının (input) doğru şekilde render edildiğini kontrol ediyoruz
		const inputs = cy.getByTestId("input");
		inputs.should("have.length", 4);

		// Form eylemi alanının (action) görünür olduğuna emin oluyoruz
		const formAction = cy.getByTestId("card-action");
		formAction.should("be.visible");

		// Butonların doğru sayıda olduğunu ve metinlerinin doğru olduğunu kontrol ediyoruz
		const buttons = cy.getByTestId("button");
		buttons.should("have.length", 2);

		// Buton metinlerini kontrol ediyoruz
		buttons.each((button, index) => {
			cy.wrap(button).should("have.text", index === 0 ? "Gönder" : "Sıfırla");
		});
	});

	it("Render correctly based on small screen", () => {
		// Küçük ekranlarda doğru render edildiğini kontrol ediyoruz
		setup({ fields: exampleFormData, onSubmit: onSubmitMock, validationSchema: exampleFormSchema, buttons: exampleFormButtons });
		const combinedField = cy.getByTestId("combined-field");
		combinedField.haveCSS({ flexDirection: "row" });

		// iPhone X ekran boyutunda doğru render edilmesini kontrol ediyoruz
		cy.viewport("iphone-x");

		// Ekran boyutu küçüldüğünde flexDirection'ın "column" olduğunu kontrol ediyoruz
		combinedField.haveCSS({ flexDirection: "column" });
	});

	it("Render correctly form header when added icon or header", () => {
		// Başlık ve ikon eklendiğinde form başlığının doğru şekilde render edildiğini kontrol ediyoruz
		setup({
			icon: icons.outline.x,
			header: "Example Form",
			fields: exampleFormData,
			onSubmit: onSubmitMock,
			validationSchema: exampleFormSchema,
			buttons: exampleFormButtons,
		});

		// Form başlığının ve ikonu içeren kutunun göründüğüne emin oluyoruz
		const formHeader = cy.getByTestId("card-header");
		formHeader.should("be.visible");

		const iconBox = cy.getByTestId("icon-box");
		iconBox.should("be.visible");
		iconBox.find("svg").should("exist");

		// Form başlığının doğru metni içerdiğini kontrol ediyoruz
		const header = cy.getByTestId("form-header");
		header.should("be.visible");
		header.should("have.text", "Example Form");
	});

	it("Render correct values based on initialValues prop", () => {
		// initialValues prop'ı ile form alanlarının doğru değerlerle render edildiğini kontrol ediyoruz
		setup({
			fields: exampleFormData,
			initialValues,
			onSubmit: onSubmitMock,
			validationSchema: exampleFormSchema,
			buttons: exampleFormButtons,
		});

		// Her bir input alanının initialValues ile sağlanan değerleri içerdiğini kontrol ediyoruz
		const nameInput = cy.get('input[name="name"]');
		nameInput.should("have.value", "Yusuf Kağan");

		const surnameInput = cy.get("input[name='surname']");
		surnameInput.should("have.value", "Kılıç");

		const emailInput = cy.get("input[name='email']");
		emailInput.should("have.value", "yusufkaankilic.yk@gmail.com");

		const phoneInput = cy.get("input[name='phone']");
		phoneInput.should("have.value", "05306329579");
	});

	it("Should validate form when form submitted", () => {
		// Form gönderildiğinde doğrulamanın yapılacağını kontrol ediyoruz
		setup({
			fields: exampleFormData,
			onSubmit: onSubmitMock,
			validationSchema: exampleFormSchema,
			buttons: exampleFormButtons,
		});

		// İsim ve soyisim alanlarını dolduruyoruz
		const nameInput = cy.get('input[name="name"]');
		nameInput.type("Yusuf Kağan");

		const surnameInput = cy.get("input[name='surname']");
		surnameInput.type("Kılıç");

		// Gönder butonuna tıklıyoruz
		const buttons = cy.getByTestId("button");
		buttons.each((button, index) => {
			if (index === 0) {
				cy.wrap(button)
					.should("exist") // buton var mı diye kontrol et
					.should("have.text", "Gönder") // butonun metni "Gönder" olmalı
					.click(); // butona tıkla
			}
		});

		// Hata mesajının doğru şekilde göründüğünü kontrol ediyoruz
		const formControlError = cy.getByTestId("form-control-error");
		formControlError.should("have.length", 1);
		formControlError.should("have.text", "Invalid email format");
	});

	it("Handle correctly onChange when data change", () => {
		// Veri değiştiğinde onChange fonksiyonunun doğru şekilde çağrıldığını kontrol ediyoruz
		setup({
			fields: exampleFormData,
			onSubmit: onSubmitMock,
			validationSchema: exampleFormSchema,
			buttons: exampleFormButtons,
			onChange: onChangeMock,
		});

		// İsim alanına "yusuf" yazıyoruz ve onChange fonksiyonunun doğru parametre ile çağrıldığını kontrol ediyoruz
		const nameInput = cy.get('input[name="name"]');
		nameInput.type("yusuf");

		cy.wrap(onChangeMock).should("have.been.calledWith", { name: "yusuf", surname: "", email: "", phone: "" });
	});

	it("Handle correctly onSubmit when data submitted", () => {
		// Form veri gönderildiğinde onSubmit fonksiyonunun doğru şekilde çalıştığını kontrol ediyoruz
		setup({
			initialValues,
			fields: exampleFormData,
			onSubmit: onSubmitMock,
			validationSchema: exampleFormSchema,
			buttons: exampleFormButtons,
		});

		// Gönder butonuna tıklıyoruz
		const buttons = cy.getByTestId("button");
		buttons.each((button, index) => {
			if (index === 0) {
				cy.wrap(button)
					.should("exist") // buton var mı diye kontrol et
					.should("have.text", "Gönder") // butonun metni "Gönder" olmalı
					.click(); // butona tıkla
			}
		});

		// onSubmit fonksiyonunun doğru değerlerle çağrıldığını kontrol ediyoruz
		cy.wrap(onSubmitMock).should("have.been.calledWith", {
			name: "Yusuf Kağan",
			surname: "Kılıç",
			email: "yusufkaankilic.yk@gmail.com",
			phone: "05306329579",
		});
	});
});
