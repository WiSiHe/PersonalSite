import type { Meta, StoryObj } from "@storybook/react"

import ScrollToTopButton from "./ScrollToTopButton"

const meta: Meta<typeof ScrollToTopButton> = {
  title: "Atoms/ScrollToTopButton",
  component: ScrollToTopButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof ScrollToTopButton>

export const Default: Story = {}

export const IsFixed: Story = {
  args: {
    isFixed: true,
  },
}
