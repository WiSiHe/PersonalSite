import type { Meta, StoryObj } from "@storybook/react"

import Card from "./Card"

const meta: Meta<typeof Card> = {
    title: "Atoms/Card",
    component: Card,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    render: ({ children = "placeholder" }) => {
        return <Card>{children}</Card>
    },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
    args: {
        children: "Card content",
    },
}
