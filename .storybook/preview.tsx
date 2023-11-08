import { Preview } from "@storybook/react"
import { withThemeByClassName } from "@storybook/addon-themes"

import "styles/globals.css"

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        layout: "padded",
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: [
        withThemeByClassName({
            themes: {
                light: "",
                dark: "dark",
            },
            defaultTheme: "light",
        }),
    ],
}

export default preview
