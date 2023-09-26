import type { Meta, StoryObj } from "@storybook/react"

import Chip from "./Chip"

const meta: Meta<typeof Chip> = {
    title: "Atoms/Chip",
    component: Chip,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        layout: "centered",
    },
}

export default meta

type Story = StoryObj<typeof Chip>

export const NotSelected: Story = {
    args: {
        hasStatus: "notSelected",
        children: <>hey</>,
    },
}

export const Selected: Story = {
    args: {
        hasStatus: "selected",
        children: <p>Hey</p>,
    },
}
