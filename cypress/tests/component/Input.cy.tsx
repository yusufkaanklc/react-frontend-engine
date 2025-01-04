import { Input } from "@/components/inputs/Input";
import { error } from "@/styles/tailwind/colors/Error";
import { getCSSVariableValue } from "@/utils/GetCSSVariableValue";

describe("Input Component", () => {
	it("should render with default props", () => {
		cy.mount(<Input name="test-input" />);

		cy.wait(500);

		// Girdi alanı wrapper'ının render edildiğini kontrol et
		cy.getByTestId("input-wrapper").should("exist");

		// Input elemanının doğru türde olduğunu kontrol et (varsayılan olarak 'text')
		cy.getByTestId("input").should("have.attr", "type", "text");

		// Input elemanının doğru placeholder'a sahip olduğunu kontrol et
		cy.getByTestId("input").should("have.attr", "placeholder", "");

		// Input elemanının varsayılan olarak boş olduğunu kontrol et
		cy.getByTestId("input").should("not.have.value");
	});

	it("should toggle password visibility when clicked", () => {
		cy.mount(<Input name="password-input" type="password" />);

		// Başlangıçta şifre girişi tipi 'password' olmalı
		cy.getByTestId("input").should("have.attr", "type", "password");

		// Şifreyi görünür yapmak için simgeye tıklanmalı
		cy.getByTestId("input-icon").click();

		// Şifre görünür olmalı
		cy.getByTestId("input").should("have.attr", "type", "text");

		// Şifreyi tekrar gizlemek için simgeye tekrar tıklanmalı
		cy.getByTestId("input-icon").click();

		// Şifre tekrar gizlenmeli
		cy.getByTestId("input").should("have.attr", "type", "password");
	});

	it("should render with custom size", () => {
		cy.mount(<Input name="custom-size-input" customSize="lg" />);

		// 'lg' boyutu için doğru sınıfın uygulandığını kontrol et
		cy.getByTestId("input-wrapper").should("have.class", "h-11"); // 'lg' boyutu için beklenen sınıf 'h-11'
	});

	it("should apply invalid state styling", () => {
		cy.mount(<Input name="invalid-input" isInvalid={true} />);

		// 'isInvalid' true olduğunda input wrapper'ında doğru 'data-invalid' özelliği kontrol edilmeli
		cy.getByTestId("input-wrapper").should("have.attr", "data-invalid", "true");

		// Hatalı durumda border renginin doğru şekilde uygulandığını kontrol et
		cy.getByTestId("input-wrapper").haveCSS({
			border: `1px solid ${getCSSVariableValue(error.dark)}`, // Border'ın hatalı renginin doğru olması gerekir
		});
	});

	it("should handle value change", () => {
		const onChangeMock = cy.stub();
		cy.mount(<Input name="value-change-input" onChange={onChangeMock} />);

		// Yeni bir değer yazılmalı
		cy.getByTestId("input").type("new value");

		// Input değeri yeni değere göre değişmeli
		cy.getByTestId("input").should("have.value", "new value");

		// `onChange` fonksiyonunun çağrıldığını kontrol et
		cy.wrap(onChangeMock).should("have.been.called");
	});

	it("should display custom icon when provided", () => {
		const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
		cy.mount(<Input name="custom-icon-input" icon={customIcon} />);

		// Özel ikonun doğru şekilde render edildiğini kontrol et
		cy.getByTestId("input-icon").should("exist");
		cy.getByTestId("custom-icon").should("exist");
	});

	it("should apply custom className", () => {
		cy.mount(<Input name="custom-classname-input" className="custom-class" />);

		// Input wrapper'ında özel class'ın doğru şekilde uygulandığını kontrol et
		cy.getByTestId("input-wrapper").should("have.class", "custom-class");
	});
});
