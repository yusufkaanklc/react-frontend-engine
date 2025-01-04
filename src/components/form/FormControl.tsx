import type { IFormControl } from "@/interfaces/components/form/IFormControl.ts";
import classNames from "classnames";

/**
 * FormControl bileşeni, form öğelerini düzenlemek ve hata mesajlarını göstermek için kullanılır.
 *
 * @param {IFormControl} props - Bileşen için gereken özellikler.
 * @param {string} [props.error] - Form kontrolü için hata mesajı (opsiyonel).
 * @param {boolean} [props.isRequired] - Alanın zorunlu olup olmadığını belirtir (opsiyonel).
 * @param {string} [props.label] - Form kontrolü etiketi (opsiyonel).
 * @param {React.ReactNode} props.children - İçerik olarak form kontrolü öğelerini belirtir.
 * @param {string} [props.className] - Ek CSS sınıfları eklemek için kullanılabilir (opsiyonel).
 *
 * @returns {JSX.Element} Form kontrolü düzenlemek için yapılandırılmış bir JSX elementi döndürür.
 */
export const FormControl = ({ error, isRequired, label, children, className }: IFormControl) => {
	return (
		<div data-testid={"form-control"} className={classNames("flex flex-col gap-1", className)}>
			{label && (
				<div data-testid={"form-control-label-box"} className={"flex gap-1 items-start"}>
					<p
						data-testid={"form-control-label"}
						data-invalid={!!error}
						className={"text-body2 text-color-primary data-[invalid='true']:text-error-dark"}
					>
						{label}
					</p>
					{isRequired && (
						<p data-testid={"form-control-asterisk"} className={"text-error-dark text-body2"}>
							*
						</p>
					)}
				</div>
			)}
			{children}
			{error && error !== "" && (
				<p data-testid={"form-control-error"} className="text-caption text-error-dark">
					{error}
				</p>
			)}
		</div>
	);
};
