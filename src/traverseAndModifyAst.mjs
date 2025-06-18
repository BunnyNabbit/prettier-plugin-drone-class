// lifted from https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/9b717272b115f64e0d2e60a238cc3d85c9bca3cd/src/traverseAndModifyAst.ts#L1-L61
import traverse from "@babel/traverse"
// import { modifyNodeIfMissingBrackets } from "./modifyNodeIfMissingBrackets.js"

export function traverseAndModifyAst(ast) {
	const modifiedNodes = new Set()
	const seenNodes = new Set()

	function collector({ node }) {
		if (node.type === "ClassMethod" && nodeNotAlreadySeen(node, seenNodes)) {
			if (!node.leadingComments || !node.leadingComments.length) {
				modifiedNodes.add(node)
				// Remove comments from the original node to avoid duplication
				delete node.leadingComments
				delete node.trailingComments
			} else {
				node.ignore = true
			}
		}
	}
	;(traverse.default ?? traverse)(ast, {
		ClassMethod: collector,
		noScope: true,
	})

	return modifiedNodes
}

function nodeNotAlreadySeen(node, seenNodes) {
	if (seenNodes.has(node)) {
		return false
	}

	// All child nodes are marked as seen and removed from collections,
	// so that we don't accidentally print overlapping fixes for them later.
	;(traverse.default ?? traverse)(node, {
		enter(path) {
			seenNodes.add(path.node)
		},
		noScope: true,
	})

	seenNodes.add(node)

	return true
}
