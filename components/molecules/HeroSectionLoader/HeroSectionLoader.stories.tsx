import type { Meta, StoryObj } from "@storybook/react"

import HeroSectionLoader from "./HeroSectionLoader"
import Image from "next/image"

const meta: Meta<typeof HeroSectionLoader> = {
  title: "Molecules/HeroSectionLoader",
  component: HeroSectionLoader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "padding",
  },
}

export default meta

type Story = StoryObj<typeof HeroSectionLoader>

export const Default: Story = {}

export const WithBackground: Story = {
  render: (args) => (
    <section className="relative aspect-video">
      <HeroSectionLoader {...args} />
      <Image src="/images/woods.png" fill alt="" />
    </section>
  ),
}
