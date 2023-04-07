import type { Meta, StoryObj } from "@storybook/react"

import Tag from "./Tag"

const meta: Meta<typeof Tag> = {
  title: "Atoms/Tag",
  component: Tag,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    children: "Tag",
  },
}
