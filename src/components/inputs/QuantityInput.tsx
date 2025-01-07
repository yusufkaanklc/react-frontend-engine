// Gerekli importlar
import { IconBox } from "@/components/IconBox";
import type { IQuantityInput } from "@/interfaces/components/inputs/IQuantityInput";
import type { ISizeSchema } from "@/interfaces/types/IMetrics";
import { icons } from "@/plugins/Icons";
import classNames from "classnames";
import { type ChangeEvent, useState } from "react";

export const QuantityInput = ({
	value = 1,
	min = 0,
	max = 999,
	size = "md",
	onChange,
	className = "",
	isInvalid = false,
	...props
}: IQuantityInput) => {
	// Girilen değeri state olarak tutuyoruz
	const [innerValue, setInnerValue] = useState<number | string>(value);

	const inputSizeSchema: ISizeSchema = {
		sm: "h-8 w-12",
		md: "h-10 w-16",
		lg: "h-12 w-20",
		xl: "h-14 w-24",
		"2xl": "h-16 w-28",
	};

	const buttonSizeSchema: ISizeSchema = {
		sm: "size-8",
		md: "size-10",
		lg: "size-12",
		xl: "size-14",
		"2xl": "size-16",
	};

	// Değer değiştiğinde çalışacak fonksiyon
	const handleChange = (newValue: number | string) => {
		onChange?.(newValue);
		setInnerValue(newValue);
	};

	// Input değeri değiştiğinde çalışacak fonksiyon
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = Number.parseInt(e.target.value);
		let validValue: number | string = newValue;
		// Değer geçersizse veya sınırların dışındaysa mevcut değeri koru
		if (newValue < min || newValue > max) {
			validValue = innerValue;
		}
		if (Number.isNaN(validValue)) {
			validValue = "";
		}
		handleChange(validValue);
	};

	return (
		<div>
			{/* Ekran okuyucular için gizli label */}
			<label htmlFor="Quantity" className="sr-only">
				Quantity
			</label>

			{/* Miktar seçici container */}
			<span
				data-testid={"quantity-input-container"}
				className={classNames(
					"inline-flex items-center rounded-lg border border-custom-divider",
					isInvalid && "border-error-dark",
				)}
			>
				{/* Azaltma butonu */}
				<button
					data-testid={"quantity-input-decrement"}
					type="button"
					onClick={() => {
						if (typeof innerValue !== "number") return;
						handleChange(innerValue - 1);
					}}
					disabled={typeof innerValue === "number" && innerValue <= min}
					className={classNames(
						"flex items-center justify-center transition enabled:hover:opacity-70 disabled:opacity-40",
						buttonSizeSchema[size],
					)}
				>
					<IconBox size="sm" color="color-primary">
						{icons.outline.minus}
					</IconBox>
				</button>

				{/* Sayı girişi */}
				<input
					{...props}
					data-testid={"quantity-input"}
					type="number"
					value={innerValue}
					onChange={handleInputChange}
					className={classNames(
						"border-transparent text-body1 bg-transparent text-color-primary text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none enabled:outline-none",
						inputSizeSchema[size],
					)}
				/>

				{/* Arttırma butonu */}
				<button
					data-testid={"quantity-input-increment"}
					type="button"
					onClick={() => {
						if (typeof innerValue !== "number") return;
						handleChange(innerValue + 1);
					}}
					disabled={typeof innerValue === "number" && innerValue >= max}
					className="size-10 flex items-center justify-center transition enabled:hover:opacity-70 disabled:opacity-40"
				>
					<IconBox size="sm" color="color-primary">
						{icons.outline.plus}
					</IconBox>
				</button>
			</span>
		</div>
	);
};
