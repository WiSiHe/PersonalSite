// no check TS

import type { Meta, StoryObj } from "@storybook/react"

import Loader from "./Loader"

const meta: Meta<typeof Loader> = {
  title: "Atoms/Loader",
  component: Loader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Loader>

export const Default: Story = {}
