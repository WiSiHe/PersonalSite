import type { Meta, StoryObj } from "@storybook/react"

import Project from "./Project"

const meta: Meta<typeof Project> = {
  title: "Molecules/Project",
  component: Project,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    // layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof Project>

export const Default: Story = {}
