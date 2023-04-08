import type { Meta, StoryObj } from "@storybook/react"

import ImageExplotionSection from "./ImageExplotionSection"

const meta: Meta<typeof ImageExplotionSection> = {
  title: "Organisms/ImageExplotionSection",
  component: ImageExplotionSection,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    // layout: "padded",
  },
}

export default meta

type Story = StoryObj<typeof ImageExplotionSection>

export const Default: Story = {}
