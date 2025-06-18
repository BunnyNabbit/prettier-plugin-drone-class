// lifted from https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/9b717272b115f64e0d2e60a238cc3d85c9bca3cd/src/parseAst.ts#L1-L43
import { parse } from "@babel/parser"

export function parseAst(code, options) {
	return parse(code, getParseOptions(/(?:js|x)$/.test(options.filepath)))
}

function getParseOptions(isJsx) {
	return {
		allowImportExportEverywhere: true,
		allowNewTargetOutsideFunction: true,
		allowReturnOutsideFunction: true,
		allowSuperOutsideMethod: true,
		allowUndeclaredExports: true,
		errorRecovery: true,
		plugins: ["doExpressions", "exportDefaultFrom", "functionBind", "functionSent", "throwExpressions", "partialApplication", "decorators", "decimal", "moduleBlocks", "asyncDoExpressions", "regexpUnicodeSets", "destructuringPrivate", "decoratorAutoAccessors", "importReflection", "explicitResourceManagement", "decoratorAutoAccessors", "typescript", ...(isJsx ? ["jsx"] : []), ["importAttributes", { deprecatedAssertSyntax: true }]],
		ranges: true,
		sourceType: "module",
	}
}
