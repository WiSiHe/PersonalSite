import type { Meta, StoryObj } from "@storybook/react"

import CarouselStatic from "./CarouselStatic"

const meta: Meta<typeof CarouselStatic> = {
  title: "Molecules/CarouselStatic",
  component: CarouselStatic,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
  },
}

export default meta

type Story = StoryObj<typeof CarouselStatic>

export const Default: Story = {}
