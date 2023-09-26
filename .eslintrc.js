module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "next",
        "plugin:storybook/recommended",
    ],
    parser: "@typescript-eslint/parser",
    settings: {
        "import/resolver": {
            node: {
                extensions: [".ts", ".tsx"],
            },
        },
    },
    plugins: ["simple-import-sort"],
    rules: {
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
        "react-hooks/exhaustive-deps": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
    },
}
