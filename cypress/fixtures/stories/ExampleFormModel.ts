import type { IFormButton, IFormFields } from "@/interfaces/components/form/IFormCreator";
import { z } from "zod";

export interface IExampleFormDataType {
	name: string;
	surname: string;
	email: string;
	phone?: string;
}

export const exampleFormSchema = z.object({
	name: z.string().min(1, "Name is required"), // Name alanı boş olamaz
	surname: z.string().min(1, "Surname is required"), // Surname alanı boş olamaz
	email: z.string().email("Invalid email format").min(1, "Email is required"), // Email zorunlu ve geçerli bir email formatı olmalı
	phone: z.string().optional(),
});

export const initialValues: IExampleFormDataType = {
	name: "Yusuf Kağan",
	surname: "Kılıç",
	email: "yusufkaankilic.yk@gmail.com",
	phone: "05306329579",
};

export const exampleFormButtons: IFormButton[] = [
	{ type: "submit", text: "Gönder", colorScheme: "primary" },
	{ type: "reset", text: "Sıfırla", colorScheme: "error", variant: "outlined" },
];

export const exampleFormData: IFormFields = {
	name_surname: {
		combined: true,
		children: {
			name: {
				type: "text",
				required: true,
				placeholder: "John",
				label: "İsim",
				initialValue: "",
			},
			surname: {
				type: "text",
				required: true,
				placeholder: "Doe",
				label: "Soyisim",
				initialValue: "",
			},
		},
	},
	email: {
		type: "email",
		required: true,
		placeholder: "johndoe@email.com",
		label: "Email",
		initialValue: "",
	},
	phone: {
		type: "text",
		required: false,
		placeholder: "0530 632 95 79",
		label: "Telefon",
		initialValue: "",
	},
};
