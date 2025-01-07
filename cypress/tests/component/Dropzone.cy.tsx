import { Dropzone } from "@/components/inputs/Dropzone";
import { remToPx } from "@/utils/RemToPx";
import { getFakePath } from "react-dropzone-kit";

// Dropzone Bileşeni için Testler
describe("Dropzone Component", () => {
	let onFilesAcceptedMock: sinon.SinonStub;

	// Her testten önce çağırılacak olan fonksiyon
	beforeEach(() => {
		onFilesAcceptedMock = cy.stub();
	});

	// Her testten sonra çağırılacak olan fonksiyon
	afterEach(() => {
		onFilesAcceptedMock.resetHistory();
	});

	let fixtures: Record<string, { fileContent: File; fileName: string; mimeType: string }>;

	const fileNames = ["file-large.png", "file-valid.png", "file-invalid.txt"];

	// Testlerden önce dosyaları yükle
	before(() => {
		fixtures = {};
		fileNames.map((fileName) => {
			const pathAddedFileName = `files/${fileName}`;
			cy.loadFixture(pathAddedFileName).then((fileData) => {
				fixtures[fileName] = fileData;
			});
		});
	});

	// Dropzone bileşeni doğru bir şekilde render edilmelidir
	it("Should render correctly dropzone", () => {
		cy.mount(<Dropzone />);
		const dropzone = cy.getByTestId("dropzone");
		const dropzoneInput = cy.getByTestId("dropzone-input");
		cy.wait(100);
		dropzone.should("be.visible");
		dropzoneInput.should("exist");
	});

	// Dropzone dış kapsayıcısının stilleri doğru uygulanmalıdır
	it("Should correctly rendered and applied styles to Dropzone Outer Container", () => {
		cy.mount(<Dropzone />);
		cy.wait(100);
		const dropzoneOuterContainer = cy.getByTestId("dropzone-outer-container");
		dropzoneOuterContainer.should("be.visible");
		dropzoneOuterContainer.haveCSS({
			cursor: "pointer",
			border: "2px dashed rgb(50, 56, 62)",
			backgroundColor: "rgba(255, 255, 255, 0.08)",
			borderRadius: "8px",
		});
	});

	// Dropzone iç kapsayıcısının stilleri doğru uygulanmalıdır
	it("Should correctly rendered and applied styles to Dropzone Container", () => {
		cy.mount(<Dropzone />);
		cy.wait(100);
		const dropzoneContainer = cy.getByTestId("dropzone-container");
		dropzoneContainer.should("be.visible");
		dropzoneContainer.haveCSS({ padding: "24px" });
	});

	// Dropzone ikon kapsayıcısının stilleri doğru uygulanmalıdır
	it("Should correctly rendered and applied styles to Dropzone Icon Container", () => {
		cy.mount(<Dropzone />);
		cy.wait(100);
		const dropzoneIconContainer = cy.getByTestId("dropzone-icon-container");
		dropzoneIconContainer.should("be.visible");
		dropzoneIconContainer.haveCSS({ display: "flex", justifyContent: "center", alignItems: "center" });
	});

	// Dropzone ikonu doğru şekilde render edilmelidir
	it("Should correctly rendered and applied styles to Dropzone Icon", () => {
		cy.mount(<Dropzone />);
		cy.wait(100);
		const dropzoneIcon = cy.getByTestId("icon-box");
		dropzoneIcon.should("be.visible");
		dropzoneIcon.haveCSS({
			color: "rgb(240, 244, 248)",
			width: "56px",
			height: "56px",
		});
	});

	// Drag metni doğru bir şekilde render edilmeli ve güncellenmelidir
	it("Should render correctly and styles apply drag text", () => {
		cy.mount(<Dropzone />);
		cy.wait(100);
		const dropzoneInput = cy.getByTestId("dropzone-input");
		const dragText = cy.getByTestId("dropzone-drag-text");
		dragText.should("be.visible");
		dragText.should("have.text", "Dosyaları sürükleyip bırakın veya buraya tıklayın");
		const { fileContent } = fixtures["file-valid.png"];
		dropzoneInput.dragDropTrigger([fileContent], "dragenter");
		cy.wait(100);
		dragText.should("have.text", "Dosyaları buraya bırakabilirsiniz!");
	});

	// Kurallar metni doğru oluşturulmalı ve stiller uygulanmalıdır
	it("Should correctly generated rules text and styles applied to Dropzone Rules Text", () => {
		cy.mount(<Dropzone maxFiles={2} maxSize={1024 * 1024 * 2} acceptedFormats={["image/jpeg"]} />);
		cy.wait(100);
		const dropzoneRulesText = cy.getByTestId("dropzone-rules-text");
		dropzoneRulesText.should("be.visible");
		dropzoneRulesText.haveCSS({ color: "rgb(240, 244, 248)", fontSize: remToPx(0.75) });
		dropzoneRulesText.should(
			"have.text",
			"Kabul edilen en fazla boyut: 2 MB - Kabul edilen en fazla dosya sayısı: 2 - Kabul edilen formatlar: image/jpeg",
		);
	});

	// Dosya kapsayıcısının stilleri doğru uygulanmalıdır
	it("Should correctly rendered and applied styles to Dropzone File Container", () => {
		cy.mount(<Dropzone />);
		cy.wait(100);
		const dropzoneFileContainer = cy.getByTestId("dropzone-file-container");
		dropzoneFileContainer.should("be.visible");
		dropzoneFileContainer.haveCSS({
			display: "flex",
			alignItems: "center",
			gap: remToPx(0.75),
			padding: "0px 8px 8px",
			overflow: "auto",
		});
	});

	// Geçerli dosyalar yüklendiğinde dosya elemanları doğru şekilde render edilmeli
	it("Should rendered and styles Dropzone File with valid files", () => {
		cy.mount(<Dropzone />);
		cy.wait(100);
		const dropzoneInput = cy.getByTestId("dropzone-input");
		dropzoneInput.attachFile([fixtures["file-valid.png"], fixtures["file-large.png"]]);
		cy.wait(300);
		const dropzoneFile = cy.getByTestId("dropzone-file");
		dropzoneFile.should("have.length", 2);
		dropzoneFile.each((file, index) => {
			cy.wrap(file).should("be.visible");
			cy.wrap(file).haveCSS({
				border: "1px solid rgb(50, 56, 62)",
				borderRadius: remToPx(0.25),
				padding: remToPx(0.5),
				fontSize: remToPx(0.75),
				color: "rgb(240, 244, 248)",
				backgroundColor: "rgba(255, 255, 255, 0.08)",
			});
			cy.wrap(file).should("have.text", index === 0 ? "files/file-valid.png0.051 MB" : "files/file-large.png6.024 MB");
		});
	});

	// Geçersiz dosya yüklendiğinde dosya elemanları doğru şekilde render edilmeli
	it("Should rendered and styles Dropzone File with invalid file", () => {
		cy.mount(<Dropzone maxSize={1024 * 1024 * 2} />);
		cy.wait(100);
		const dropzoneInput = cy.getByTestId("dropzone-input");
		dropzoneInput.attachFile([fixtures["file-large.png"]]);
		cy.wait(300);
		const dropzoneFile = cy.getByTestId("dropzone-file");
		dropzoneFile.should("have.length", 1);
		dropzoneFile.should("be.visible");
		dropzoneFile.haveCSS({
			border: "1px solid rgb(240, 68, 56)",
			borderRadius: remToPx(0.25),
			padding: remToPx(0.5),
			fontSize: remToPx(0.75),
			color: "rgb(240, 244, 248)",
			backgroundColor: "rgba(249, 121, 112, 0.15)",
		});
		dropzoneFile.should("have.text", "files/file-large.png6.024 MB");
	});

	// Dosya silme işlemi doğru şekilde çalışmalı
	it("Remove successfully when clicked to dropzone file remove button", () => {
		cy.mount(<Dropzone />);
		const dropzoneInput = cy.getByTestId("dropzone-input");
		dropzoneInput.attachFile([fixtures["file-large.png"]]);
		cy.wait(300);
		const dropzoneFileRemoveButton = cy.getByTestId("dropzone-file-remove-icon");
		dropzoneFileRemoveButton.trigger("click");
		cy.wait(300);
		const dropzoneFile = cy.getByTestId("dropzone-file");
		dropzoneFile.should("not.exist");
	});

	// Dosya yüklendiğinde onFilesAccepted doğru şekilde çalışmalı
	it("Handle onFilesAccepted correctly when file upload", () => {
		cy.mount(<Dropzone onFilesAccepted={onFilesAcceptedMock} maxSize={1024 * 1024 * 2} />);
		cy.wait(100);
		const dropzoneInput = cy.getByTestId("dropzone-input");
		const { fileContent: validFileContent, fileName: validFileName } = fixtures["file-valid.png"];
		const { fileContent: largeFileContent } = fixtures["file-large.png"];
		dropzoneInput.dragDropTrigger([validFileContent, largeFileContent], "drop");
		dropzoneInput.invoke("val").should("eq", getFakePath(validFileName));
		cy.wait(100);
		cy.wrap(onFilesAcceptedMock).should("be.calledTwice", [validFileContent], [largeFileContent]);
	});
});
