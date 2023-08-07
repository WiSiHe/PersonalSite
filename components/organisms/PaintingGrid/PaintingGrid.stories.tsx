import type { Meta, StoryObj } from "@storybook/react"

import { dummyPaintings } from "./dummyData"
import PaintingGrid from "./PaintingGrid"

const meta: Meta<typeof PaintingGrid> = {
  title: "Organisms/PaintingGrid",
  component: PaintingGrid,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
  },
}

export default meta

type Story = StoryObj<typeof PaintingGrid>

export const Default: Story = {}

export const WithImages: Story = {
  args: {
    paintings: dummyPaintings,
    isStorybook: true,
  },
}
