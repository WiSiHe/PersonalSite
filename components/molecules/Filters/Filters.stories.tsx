import type { Meta, StoryObj } from "@storybook/react"

import { dummyData } from "./dummyData"
import Filters from "./Filters"

const meta: Meta<typeof Filters> = {
    title: "Molecules/Filters",
    component: Filters,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        // layout: "padded",
    },
}

export default meta

type Story = StoryObj<typeof Filters>

export const Default: Story = {
    args: {
        activeFilter: "All",
        amountOfPaintings: 10,
        filteredTags: dummyData,
    },
}

// _id: string
// name: string
// description: string
// paintingsCount: number
// projectCount: number
// videoCount?: number
