import type { IProgressBar } from "@/interfaces/components/IProgressBar";
import type { ISize } from "@/interfaces/types/IMetrics";
import classNames from "classnames";

export const ProgressBar = ({ value, size = "md" }: IProgressBar) => {
	// Değerin 0 ile 100 arasında olduğundan emin ol
	const normalizedValue = Math.min(Math.max(value, 0), 100);

	const sizeSchema: Record<ISize, string> = {
		sm: "h-2 text-caption",
		md: "h-4 text-caption",
		lg: "h-6 text-body2",
		xl: "h-8 text-body1",
		"2xl": "h-10 text-body1",
	};

	return (
		<div data-testid="progress-bar">
			{/* Ekran okuyucular için gizli etiket */}
			<span id="ProgressLabel" className="sr-only">
				Progress Bar
			</span>

			{/* Ana ilerleme çubuğu konteyneri */}
			<span
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={100}
				data-testid="progress-bar-container"
				aria-labelledby="ProgressLabel"
				aria-valuenow={normalizedValue}
				tabIndex={0}
				className="block rounded-full bg-action-disabled"
			>
				{/* İlerleme değeri 0'dan büyükse çubuğu göster */}

				<span
					data-testid="progress-bar-fill"
					className={classNames("block rounded-full bg-primary-main text-center transition-all duration-300", sizeSchema[size])}
					style={{ width: `${normalizedValue}%` }}
				>
					{normalizedValue > 0 && <span className="text-white">{normalizedValue}%</span>}
				</span>
			</span>
		</div>
	);
};
