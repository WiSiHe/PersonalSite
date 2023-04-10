import type { Meta, StoryObj } from "@storybook/react"

import { dummyPaintings, dummyTags } from "./dummyData"
import GalleryPage from "./GalleryPage"
// import { dummyPaintings, dummyTags } from "./dummyData"

const meta: Meta<typeof GalleryPage> = {
  title: "Page/GalleryPage",
  component: GalleryPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof GalleryPage>

export const Default: Story = {
  args: {
    paintings: [],
    tags: [],
  },
}

export const WithPaintings: Story = {
  args: {
    paintings: dummyPaintings,
    tags: dummyTags,
  },
}
