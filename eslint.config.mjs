// @ts-check

import tseslint from "typescript-eslint";

import eslint from "@eslint/js";

export default [
    ...tseslint.config(eslint.configs.recommended, ...tseslint.configs.strict, {
        ignores: ["**/*.mjs", "**/*.cjs"],
        rules: {
            indent: ["error", 4],
            quotes: ["error", "single"],
            semi: ["error", "always"],
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                    paths: ["src"],
                },
            },
        },
    }),
];
