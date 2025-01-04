import type { IDetailList, IDetailListStyleClass } from "@/interfaces/components/IDetailList";
import classNames from "classnames";

export const DetailList = ({ data, options }: IDetailList) => {
	const { striped, bordered, className, styleClass, style } = options || {};

	// Varsayılan stil aktif mi kontrol et
	const isDefaultStyleActive = (key: IDetailListStyleClass) =>
		!styleClass?.[key] || (styleClass[key] as { defaultStyleActive?: boolean })?.defaultStyleActive !== false;

	// Detail list için ana container sınıfını oluştur
	const detailListClass = classNames(
		{
			[`-my-3 ${bordered ? "divide-y divide-custom-divider" : ""} text-body2 text-color-primary`]:
				isDefaultStyleActive("detail-list"),
		},
		styleClass?.["detail-list"]?.customStyle,
		className,
	);

	// Detail list öğeleri için sınıf oluştur
	const detailListItemClass = classNames(
		{
			[`grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 ${striped ? "even:bg-action-hover" : ""}`]:
				isDefaultStyleActive("detail-list-item"),
		},
		styleClass?.["detail-list-item"]?.customStyle,
	);

	// Başlık alanı için sınıf oluştur
	const detailListTitleClass = classNames(styleClass?.["detail-list-title"]?.customStyle);

	// Değer alanı için sınıf oluştur
	const detailListValueClass = classNames(
		{
			"opacity-70 sm:col-span-2": isDefaultStyleActive("detail-list-value"),
		},
		styleClass?.["detail-list-value"]?.customStyle,
	);

	return (
		<dl className={detailListClass} data-testid="detail-list" style={style}>
			{data &&
				data.length > 0 &&
				data.map((d, index) => (
					<div data-testid="detail-list-item" key={index.toString()} className={detailListItemClass}>
						<dt className={detailListTitleClass}>{d.title}</dt>
						<dd className={detailListValueClass}>{d.value}</dd>
					</div>
				))}
		</dl>
	);
};
