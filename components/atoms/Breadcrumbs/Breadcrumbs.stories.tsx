import type { Meta, StoryObj } from "@storybook/react"

import Breadcrumbs from "./Breadcrumbs"

const meta: Meta<typeof Breadcrumbs> = {
  title: "Atoms/Breadcrumbs",
  component: Breadcrumbs,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen@",
  },
}

export default meta

type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  args: {
    breadcrumbs: [
      {
        name: "Home",
        path: "#",
      },
      {
        name: "About",
        path: "#",
      },
    ],
  },
}
