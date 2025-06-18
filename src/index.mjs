import * as prettierPluginBabel from "prettier/plugins/babel"

export const parsers = {
	"js-parse": {
		async parse(text) {
			const ast = await prettierPluginBabel.parsers.babel.parse(text)
			console.log(ast)
			return ast
		},
		astFormat: "estree",
	},
}

export const languages = [
	{
		extensions: [".js", ".mjs", ".cjs", ".ts"],
		name: "ajva script",
		parsers: ["js-parse"],
	},
]

export const printers = {
	estree: {
		async print() {},
	},
}
