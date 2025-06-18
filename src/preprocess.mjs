// lifted from https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/9b717272b115f64e0d2e60a238cc3d85c9bca3cd/src/preprocess.ts#L1-L14
import { parseAst } from "./parseAst.mjs"
import { reprintAst } from "./reprintAst.mjs"
import { traverseAndModifyAst } from "./traverseAndModifyAst.mjs"

export function preprocess(code, options) {
	// First, we parse the AST using Babel's standard AST parsers.
	const ast = parseAst(code, options)

	// We then traverse it, collecting nodes that have block properties added.
	const modifiedNodes = traverseAndModifyAst(ast)

	// We then print the AST back with Babel, modifying collected nodes' ranges.
	return reprintAst(code, Array.from(modifiedNodes))
}
