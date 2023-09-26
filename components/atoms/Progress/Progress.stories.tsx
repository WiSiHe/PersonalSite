/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from "@storybook/react"

import Progress from "./Progress"

const meta: Meta<typeof Progress> = {
    title: "Atoms/Progress",
    component: Progress,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        // layout: "padded",
    },
}

export default meta

type Story = StoryObj<typeof Progress>

export const Default: Story = {}
