import type { Meta, StoryObj } from "@storybook/react"

import Carousel from "./Carousel"

const meta: Meta<typeof Carousel> = {
    title: "Atoms/Carousel",
    component: Carousel,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    render: ({ children = "placeholder" }) => {
        return <Carousel>{children}</Carousel>
    },
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Default: Story = {
    args: {
        children: "Accordion content",
    },
}
