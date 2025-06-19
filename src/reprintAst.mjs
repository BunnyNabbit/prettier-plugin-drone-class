// lifted from https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/9b717272b115f64e0d2e60a238cc3d85c9bca3cd/src/reprintAst.ts#L3-L39
import generate from "@babel/generator"

const printOptions = {
	comments: true,
	minified: true,
	retainFunctionParens: true,
	retainLines: true,
}

export function reprintAst(code, collectedNodes) {
	if (!collectedNodes.length) {
		return code
	}

	let output = ""
	let lastEnd = 0

	for (const collectedNode of collectedNodes) {
		output += code.slice(lastEnd, collectedNode.start)

		// See https://github.com/prettier/prettier/issues/9114 for a Prettier AST format API.

		output += "\n"

		const generateResult = (generate.default ?? generate)(collectedNode, printOptions).code.trim()

		if (generateResult.startsWith("//") || generateResult.startsWith("/*")) {
			// hack to clear excessive newlines (\n\n\n > \n)
			output += generateResult.replace(/\n+/, "\n")
		} else {
			output += generateResult
		}

		lastEnd = collectedNode.end
	}
	return output + code.slice(lastEnd)
}
