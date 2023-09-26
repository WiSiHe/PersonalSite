/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from "@storybook/react"

import Checkbox from "./Checkbox"

const meta: Meta<typeof Checkbox> = {
    title: "Atoms/Checkbox",
    component: Checkbox,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        // layout: "padded",
    },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
    args: {
        label: "John Doe",
    },
}
