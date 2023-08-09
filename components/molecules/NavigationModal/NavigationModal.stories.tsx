import type { Meta, StoryObj } from "@storybook/react"

import NavigationModal from "./NavigationModal"

const meta: Meta<typeof NavigationModal> = {
  title: "Organisms/NavigationModal",
  component: NavigationModal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
  },
}

export default meta

type Story = StoryObj<typeof NavigationModal>

export const Default: Story = {}

export const WithImages: Story = {
  args: {},
}
