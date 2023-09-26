module.exports = {
    parser: "typescript",
    trailingComma: "all",
    printWidth: 100,
    tabWidth: 4,
    semi: false,
    trailingComma: "none",
    arrowParens: "avoid",
    // jsxBracketSameLine: true,
    plugins: [require("prettier-plugin-tailwindcss")],
}
