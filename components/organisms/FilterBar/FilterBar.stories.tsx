import type { Meta, StoryObj } from "@storybook/react"

import { dummyTags } from "./dummyData"
import FilterBar from "./FilterBar"

const meta: Meta<typeof FilterBar> = {
    title: "Organisms/FilterBar",
    component: FilterBar,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        // layout: "padded",
    },
}

export default meta

type Story = StoryObj<typeof FilterBar>

export const Default: Story = {}

export const WithFilters: Story = {
    args: {
        filters: dummyTags,
    },
}
