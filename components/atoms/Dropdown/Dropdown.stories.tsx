import type { Meta, StoryObj } from "@storybook/react"

import Dropdown from "./Dropdown"

const meta: Meta<typeof Dropdown> = {
  title: "Atoms/Dropdown",
  component: Dropdown,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen@",
  },
}

export default meta

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}
