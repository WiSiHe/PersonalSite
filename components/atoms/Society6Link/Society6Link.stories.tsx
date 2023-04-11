import type { Meta, StoryObj } from "@storybook/react"

import Society6link from "./Society6link"

const meta: Meta<typeof Society6link> = {
  title: "Atoms/Store/Society6link",
  component: Society6link,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Society6link>

export const HasLink: Story = {
  args: {
    href: "https://www.redbubble.com/people/brunocarvalho/works/50800000-portfolio",
  },
}

export const NoLink: Story = {
  args: {
    href: "",
  },
}
