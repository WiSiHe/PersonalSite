import type { Meta, StoryObj } from "@storybook/react"

import SideMenu from "./SideMenu"

const meta: Meta<typeof SideMenu> = {
    title: "Organisms/SideMenu",
    component: SideMenu,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        // layout: "padded",
    },
}

export default meta

type Story = StoryObj<typeof SideMenu>

export const Default: Story = {}
