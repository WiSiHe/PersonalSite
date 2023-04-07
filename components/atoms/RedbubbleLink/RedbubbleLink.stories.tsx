import type { Meta, StoryObj } from "@storybook/react"

import RedbubbleLink from "./RedbubbleLink"

const meta: Meta<typeof RedbubbleLink> = {
  title: "Atoms/RedbubbleLink",
  component: RedbubbleLink,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof RedbubbleLink>

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
