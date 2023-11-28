import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
    stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-themes",
        "@storybook/addon-a11y",
        "@chromaui/addon-visual-tests",
        {
            name: "@chromaui/addon-visual-tests",
            options: {
                debug: true,
            },
        },
    ],
    framework: "@storybook/nextjs",
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../public"],
}
export default config
