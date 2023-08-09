import type { Meta, StoryObj } from "@storybook/react"

import AboutPage from "./AboutPage"

const meta: Meta<typeof AboutPage> = {
  title: "Page/AboutPage",
  component: AboutPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof AboutPage>

export const Default: Story = {}

export const WithData: Story = {
  args: {},
}
