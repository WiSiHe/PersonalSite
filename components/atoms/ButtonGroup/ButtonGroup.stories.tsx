import type { Meta, StoryObj } from "@storybook/react"

import ButtonGroup from "./ButtonGroup"

const meta: Meta<typeof ButtonGroup> = {
  title: "Atoms/ButtonGroup",
  component: ButtonGroup,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {}
