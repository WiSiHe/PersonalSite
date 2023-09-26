/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from "@storybook/react"

import Select from "./Select"

const meta: Meta<typeof Select> = {
    title: "Atoms/Select",
    component: Select,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        // layout: "padded",
    },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
    args: {
        options: [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3" },
        ],
    },
}
