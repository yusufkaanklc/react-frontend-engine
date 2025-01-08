import type { IDetailList, IDetailListStyleClass } from "@/interfaces/components/IDetailList";
import { useThemeStore } from "@/stores/ThemeStore";
import classNames from "classnames";
import { get, isEmpty, isNull, isUndefined } from "lodash";

export const DetailList = ({ data, options }: IDetailList) => {
	const { striped, bordered, className, styleClass } = options || {};

	// Varsayılan stil aktif mi kontrol et
	const isDefaultStyleActive = (key: IDetailListStyleClass) =>
		!styleClass?.[key] || (styleClass[key] as { defaultStyleActive?: boolean })?.defaultStyleActive !== false;

	const theme = useThemeStore((state) => state.theme);

	const detailListContainerClass = classNames(
		{
			[`flow-root ${bordered || isUndefined(bordered) ? `rounded-lg py-3 ${theme === "light" ? "shadow-card" : ""} border border-custom-divider` : ""}`]:
				isDefaultStyleActive("detail-list-container"),
		},
		styleClass?.["detail-list-container"]?.customStyle,
		className,
	);

	// Detail list için ana container sınıfını oluştur
	const detailListClass = classNames(
		{
			[`-my-3 ${bordered || isUndefined(bordered) ? "divide-y divide-custom-divider" : ""} text-body2 text-color-primary`]:
				isDefaultStyleActive("detail-list"),
		},
		styleClass?.["detail-list"]?.customStyle,
	);

	// Detail list öğeleri için sınıf oluştur
	const detailListItemClass = classNames(
		{
			[`break-words grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 ${bordered || isUndefined(bordered) ? "p-3" : ""} ${striped || isUndefined(striped) ? "even:bg-action-hover" : ""}`]:
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
		<div className={detailListContainerClass} data-testid="detail-list-container">
			<dl className={detailListClass} data-testid="detail-list">
				{!isUndefined(data) &&
					!isNull(data) &&
					!isEmpty(data) &&
					data.map((d, index) => (
						<div data-testid="detail-list-item" key={index.toString()} className={detailListItemClass}>
							<dt className={detailListTitleClass}>{get(d, "title", "")}</dt>
							<dd className={detailListValueClass}>{get(d, "value", "")}</dd>
						</div>
					))}
			</dl>
		</div>
	);
};
