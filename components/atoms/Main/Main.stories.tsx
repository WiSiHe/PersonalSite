import type { Meta, StoryObj } from "@storybook/react"

import Main from "./Main"

const meta: Meta<typeof Main> = {
  title: "Atoms/Main",
  component: Main,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Main>

export const Default: Story = {}

export const WithChildren: Story = {}
