/** @type {import("prettier").Config} */
export default {
	semi: false,
	plugins: ["./src/index.mjs"],
	printWidth: Infinity,
	trailingComma: "es5",
	useTabs: true,
	endOfLine: "auto",
}
