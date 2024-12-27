import tinycolor from "tinycolor2";

export const getCSSVariableValue = (variable: string, isValueInVar = true, returnFormat: "rgb" | "hex" | "hsl" = "rgb") => {
	// Değişken adını yakalar
	const matchedVariable = isValueInVar ? variable.match(/var\((--[\w-]+)\)/)?.[1] : variable;

	if (!matchedVariable) return undefined;

	// CSS değişken değerini alır
	let rawValue = getComputedStyle(document.documentElement).getPropertyValue(matchedVariable).trim();

	if (!rawValue) return undefined;

	// Eğer renk rgba(32 36 39 / 1) formatında geliyorsa, bunu düzelt
	if (rawValue.includes("rgba") && rawValue.includes("/")) {
		// "rgba(32 36 39 / 1)" formatını "rgba(32, 36, 39, 1)" formatına dönüştür
		rawValue = rawValue.replace(/rgba\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*(\d(\.\d+)?)\)/, "rgba($1, $2, $3, $4)");
	}

	const color = tinycolor(rawValue);

	// İstenen dönüşüme göre dönen değer
	switch (returnFormat) {
		case "hex":
			return color.toHexString();
		case "hsl":
			return color.toHslString();
		case "rgb":
			return color.toRgbString();
		default:
			return color.toRgbString();
	}
};
