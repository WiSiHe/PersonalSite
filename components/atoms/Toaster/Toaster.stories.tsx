import type { Meta, StoryObj } from "@storybook/react"

import Toaster from "./Toaster"

const meta: Meta<typeof Toaster> = {
    title: "Atoms/Toaster",
    component: Toaster,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        layout: "centered",
    },
}

export default meta

type Story = StoryObj<typeof Toaster>

export const Default: Story = {
    args: {
        title: "This is a toaster",
        subtitle: "This is a subtitle",
        type: "info",
    },
}

export const Success: Story = {
    args: {
        title: "This is a success toaster",
        subtitle: "This is a success subtitle",
        type: "success",
    },
}

export const Warning: Story = {
    args: {
        title: "This is a warning toaster",
        subtitle: "This is a warning subtitle",
        type: "warning",
    },
}

export const Error: Story = {
    args: {
        title: "This is an error toaster",
        subtitle: "This is an error subtitle",
        type: "error",
    },
}

export const Info: Story = {
    args: {
        title: "This is an info toaster",
        subtitle: "This is an info subtitle",
        type: "info",
    },
}
