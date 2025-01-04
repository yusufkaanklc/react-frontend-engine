import type { IRadioBox } from "@/interfaces/components/form/inputs/IRadioBox.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import { icons } from "@/plugins/Icons.tsx";
import classNames from "classnames";
import { useEffect, useState } from "react";

/**
 * Checkbox bileşeni, kullanıcıların bir seçenek veya durumu işaretlemesini sağlamak için kullanılır.
 *
 * @param {IRadioBox} props - Bileşen için gereken özellikler.
 * @param {string} [props.color="primary-main"] - Checkbox'ın renk şeması (varsayılan: "primary-main").
 * @param {boolean} [props.checked=false] - Checkbox'ın işaretli olup olmadığını belirtir (varsayılan: false).
 * @param {string} [props.name] - Checkbox öğesinin adı.
 * @param {any} [props.value] - Checkbox öğesinin değeri (başlangıçta undefined veya null olabilir).
 * @param {boolean} [props.isInvalid=false] - Checkbox'ın geçersiz olup olmadığını belirtir (varsayılan: false).
 * @param {ISize} [props.size="md"] - Checkbox boyutunu belirtir (varsayılan: "md").
 * @param {string} [props.id] - Checkbox öğesinin benzersiz kimliği.
 * @param {string} [props.className] - Ek CSS sınıfları eklemek için kullanılabilir (opsiyonel).
 *
 * @returns {JSX.Element} Checkbox bileşenini döndürür.
 */
export const Checkbox = ({
	color = "primary-main",
	checked,
	name,
	value,
	isInvalid = false,
	size = "md",
	id,
	className,
	...props
}: IRadioBox) => {
	const [isChecked, setIsChecked] = useState(checked);

	const sizeSchema: Record<ISize, string> = {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
		xl: "w-8 h-8",
		"2xl": "w-10 h-10",
	};

	const iconSizeScheme: Record<ISize, string> = {
		sm: "w-3 h-3",
		md: "w-4 h-4",
		lg: "w-5 h-5",
		xl: "w-7 h-7",
		"2xl": "w-9 h-9",
	};

	const handleClick = () => {
		setIsChecked((prev) => !prev);
	};

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	useEffect(() => {
		if (typeof value === "undefined" || value === null) return;
		setIsChecked(Boolean(value));
	}, [value]);

	return (
		// todo: onKeyDown
		<label
			data-testid={"checkbox-label"}
			data-invalid={isInvalid}
			onKeyDown={() => {}}
			onClick={handleClick}
			htmlFor={id}
			className={classNames(
				"relative appearance-none inline-block border rounded-md",
				"data-[invalid='false']:border-custom-divider",
				"data-[invalid='true']:border-error-dark",
				{
					[`bg-${color}`]: isChecked,
				},
				sizeSchema[size],
				className,
			)}
		>
			<input
				id={id}
				data-testid={"checkbox-input"}
				{...props}
				type="checkbox"
				name={name}
				checked={isChecked}
				className={classNames("appearance-none sr-only absolute inset-0")}
			/>
			{isChecked && (
				<div
					data-testid={"checkbox-check"}
					className={classNames("absolute inset-0 flex justify-center items-center transition-all")}
				>
					<div data-testid={"check-icon"} className={classNames("text-white", iconSizeScheme[size])}>
						{icons.outline.check}
					</div>
				</div>
			)}
		</label>
	);
};
