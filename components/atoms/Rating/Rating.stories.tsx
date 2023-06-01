/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from "@storybook/react"

import Rating from "./Rating"

const meta: Meta<typeof Rating> = {
  title: "Atoms/Rating",
  component: Rating,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    // layout: "padded",
  },
}

export default meta

type Story = StoryObj<typeof Rating>

export const Default: Story = {}

export const Small: Story = {
  args: {
    size: "small",
  },
}
