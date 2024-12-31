import type { IOption } from "@/interfaces/components/form/inputs/ISelect.ts";
import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import type { IColorVariants, ISize } from "@/interfaces/types/IMetrics.ts";
import type { ReactNode } from "react";
import type { IFileError } from "react-dropzone-kit";
import type { DefaultValues } from "react-hook-form";
import type { z } from "zod";

export type IFormFieldValueTypes = boolean | string | number | undefined | File[];

export interface IDefaultFormField {
	type: "text" | "email" | "select" | "checkbox" | "radiobox" | "toggle" | "textarea" | "password" | "dropzone";
	label: string;
	disabled?: boolean;
	checked?: boolean;
	initialValue?: IFormFieldValueTypes;
	placeholder?: string;
	required?: boolean;
	readonly?: boolean;
	selectSettings?: {
		options?: IOption[];
		isSearchable?: boolean;
		endpoint?: string;
	};
	dropzoneSettings?: {
		multiple?: boolean;
		maxFiles?: number;
		maxSize?: number;
		minSize?: number;
		validationMessages?: IFileError[];
		acceptedFormats?: string[];
	};
}

export interface IChildrenFormField {
	combined?: boolean;
	children?: Record<
		string,
		Pick<IDefaultFormField, "checked" | "initialValue" | "type" | "readonly" | "label" | "required" | "disabled" | "placeholder">
	>;
}

export type IFormField = IDefaultFormField | IChildrenFormField;

export interface IFormButton {
	type?: "submit" | "reset" | "button";
	text: string;
	colorScheme?: IColorVariants;
	variant?: "contained" | "outlined" | "underlined";
	action?: () => void;
}

export type IFormFields = Record<string, IFormField>;

export interface IFormCreator<T> {
	onChange?: (data: T) => void;
	size?: ISize | "full";
	fields: IFormFields;
	onSubmit: (data: T) => Promise<void> | void;
	initialValues?: DefaultValues<T>;
	header?: string;
	validationSchema: z.ZodObject<Record<string, z.ZodTypeAny>>;
	icon?: ReactNode;
	buttons: IFormButton[];
	className?: string;
	cardStyles?: {
		card?: ICustomStylesConfig;
		cardHeader?: ICustomStylesConfig;
		cardBody?: ICustomStylesConfig;
		cardAction?: ICustomStylesConfig;
	};
}
