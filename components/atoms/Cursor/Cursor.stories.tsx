import type { Meta, StoryObj } from "@storybook/react"

import Cursor from "./Cursor"

const meta: Meta<typeof Cursor> = {
    title: "Atoms/Cursor",
    component: Cursor,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        layout: "centered",
    },
}

export default meta

type Story = StoryObj<typeof Cursor>

export const Default: Story = {}
