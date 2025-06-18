// lifted from https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/9b717272b115f64e0d2e60a238cc3d85c9bca3cd/src/reprintAst.ts#L3-L39
import { doc } from "prettier"
import generate from "@babel/generator"
const { hardline, concat } = doc.builders

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
	// let output = doc.builders.concat([]) // doc.builders.concat([]) is equivalent to an empty string
	let lastEnd = 0

	for (const collectedNode of collectedNodes) {
		output += code.slice(lastEnd, collectedNode.start)

		// See https://github.com/prettier/prettier/issues/9114 for a Prettier AST format API.

		output += "\n"
		// output = concat([output, code.slice(lastEnd, collectedNode.start), hardline, (generate.default ?? generate)(collectedNode, printOptions).code.trim()])

		output += (generate.default ?? generate)(collectedNode, printOptions).code.trim()

		lastEnd = collectedNode.end
	}
	// console.log(doc.builder)
	return output + code.slice(lastEnd)
	// output = concat([output, code.slice(lastEnd)])
	// return doc.printer.printDocToString(output, printOptions).formatted
}
