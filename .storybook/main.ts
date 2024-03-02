import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
    stories: [
        "./*.mdx",
        "../components/**/*.mdx",
        "../components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-themes",
        "@storybook/addon-a11y",
        "@chromatic-com/storybook",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {
            builder: { useSWC: true },
        },
    },
    docs: {
        autodocs: "tag",
        defaultName: "Documentation",
    },
    staticDirs: ["../public"],
}
export default config
