// Gerekli importlar
import { IconBox } from "@/components/IconBox";
import type { IQuantityInput } from "@/interfaces/components/inputs/IQuantityInput";
import { icons } from "@/plugins/Icons";
import { type ChangeEvent, useState } from "react";

export const QuantityInput = ({ value = 1, min = 0, max = 999, onChange, className = "", ...props }: IQuantityInput) => {
	// Girilen değeri state olarak tutuyoruz
	const [innerValue, setInnerValue] = useState<number | string>(value);

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
			<span data-testid={"quantity-input-container"} className="inline-flex items-center rounded border border-custom-divider">
				{/* Azaltma butonu */}
				<button
					data-testid={"quantity-input-decrement"}
					type="button"
					onClick={() => {
						if (typeof innerValue !== "number") return;
						handleChange(innerValue - 1);
					}}
					disabled={typeof innerValue === "number" && innerValue <= min}
					className="size-10 flex items-center justify-center transition enabled:hover:opacity-70 disabled:opacity-40"
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
					className="h-10 w-16 border-transparent text-body1 bg-transparent text-color-primary text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none enabled:outline-none"
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
