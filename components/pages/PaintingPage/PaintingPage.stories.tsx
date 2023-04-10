import type { Meta, StoryObj } from "@storybook/react"

import PaintingPage from "./PaintingPage"
import { dummyPainting } from "./paintingDummyData"

const meta: Meta<typeof PaintingPage> = {
  title: "Page/PaintingPage",
  component: PaintingPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof PaintingPage>

export const Default: Story = {}

export const WithData: Story = {
  args: {
    painting: dummyPainting,
  },
}
