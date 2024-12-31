import { IconBox } from "@/components/IconBox";
import type { ISizeSchema } from "@/components/inputs/Toggle";
import type { IInput } from "@/interfaces/components/form/inputs/IInput.ts";
import { icons } from "@/plugins/Icons.tsx";
import classNames from "classnames";
import { type FC, useState } from "react";

// Input componenti tanımlanır.
// Kullanıcıdan gelen çeşitli özellikleri destekler ve bu özelliklere göre farklı stiller uygular.
export const Input: FC<IInput> = ({
	type = "text",
	onClick,
	isInvalid = false,
	onChange,
	onBlur,
	placeholder = "",
	id,
	value,
	name,
	icon,
	customSize = "md", // Varsayılan boyut "md" olarak ayarlanmıştır.
	className = "",
	...props
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	// Farklı boyutlar için CSS sınıflarını tanımlayan bir schema.
	const sizeSchema: ISizeSchema = {
		sm: "h-9", // Küçük boyut
		md: "h-10", // Orta boyut (varsayılan)
		lg: "h-11", // Büyük boyut
		xl: "h-12", // Ekstra büyük boyut
		"2xl": "h-14", // İki kat ekstra büyük boyut
	};

	const handlePasswordVisibilityChange = () => {
		if (type !== "password") return;
		setIsPasswordVisible((prev) => !prev);
	};

	return (
		// Ana sarmalayıcı (wrapper) element.
		// Girdi alanını ve opsiyonel ikonu içerir.
		<div
			data-testid={"input-wrapper"} // Testlerde kullanılmak üzere `data-testid` özelliği eklendi.
			data-invalid={isInvalid} // Hata durumunu belirtmek için `data-invalid` özelliği kullanılır.
			className={classNames(
				"relative rounded-lg w-full shadow-sm bg-transparent pr-6", // Temel stiller
				sizeSchema[customSize], // Boyut şeması bazlı sınıflar
				"border-custom-divider border text-color-primary", // Kenarlık ve metin renk stilleri
				"data-[invalid='true']:border-error-dark", // Hata durumunda kenarlık rengi
				"data-[invalid='false']:hover:border-primary-main", // Hata durumu yokken hover stili
				"data-[invalid='false']:focus-within:border-primary-main", // Fokus stili
				className, // Kullanıcı tarafından sağlanan ek sınıflar
			)}
		>
			{/* Girdi alanı (input) */}
			<input
				data-testid={"input"} // Testlerde kullanılmak üzere `data-testid` özelliği eklendi.
				type={isPasswordVisible ? "text" : type} // Girdi türü (örneğin: text, password)
				onClick={onClick} // Tıklama olayını yakalar
				value={value} // Kontrollü değer
				onChange={onChange} // Değer değişikliği olayını yakalar
				onBlur={onBlur} // Fokus dışına çıkıldığında çalışır
				placeholder={placeholder} // Yer tutucu metin
				id={id} // Benzersiz kimlik
				name={name} // Form alanı ismi
				className={classNames(
					"appearance-none text-body1 px-3 border-none shadow-none bg-transparent focus:outline-0 w-full h-full", // Input özel stilleri
				)}
				{...props} // Ekstra özellikler (örneğin, `aria-*` veya `data-*`)
			/>
			{/* Opsiyonel ikon alanı */}
			<div
				data-testid={"input-icon"}
				onKeyDown={() => {}}
				onClick={handlePasswordVisibilityChange}
				className={"absolute top-1/2 -translate-y-1/2 right-3"}
			>
				{type === "password" ? (
					<IconBox color={"color-primary"} className={"w-3"}>
						{isPasswordVisible ? icons.outline.eye : icons.outline.eye_slash}
					</IconBox>
				) : (
					icon
				)}
			</div>
		</div>
	);
};
