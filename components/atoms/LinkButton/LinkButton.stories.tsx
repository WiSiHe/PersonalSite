// no check TS

import type { Meta, StoryObj } from "@storybook/react"

import LinkButton from "./LinkButton"

const meta: Meta<typeof LinkButton> = {
  title: "Atoms/LinkButton",
  component: LinkButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof LinkButton>

export const Default: Story = {
  args: {
    href: "/",
    children: <>hey</>,
  },
}
