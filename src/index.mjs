// lifted from https://github.com/JoshuaKGoldberg/prettier-plugin-curly/blob/9b717272b115f64e0d2e60a238cc3d85c9bca3cd/src/index.ts#L3-L20
import * as babel from "prettier/parser-babel"
import * as typescript from "prettier/parser-typescript"
import { preprocess } from "./preprocess.mjs"

export const parsers = {
	babel: {
		...(babel.default ?? babel).parsers.babel,
		preprocess,
	},
	typescript: {
		...(typescript.default ?? typescript).parsers.typescript,
		preprocess,
	},
}
