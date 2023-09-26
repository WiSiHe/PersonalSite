import type { Meta, StoryObj } from "@storybook/react"

import NavigationLinks from "./NavigationLinks"

const meta: Meta<typeof NavigationLinks> = {
    title: "Atoms/NavigationLinks",
    component: NavigationLinks,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        layout: "centered",
    },
}

export default meta

type Story = StoryObj<typeof NavigationLinks>

export const Default: Story = {}
