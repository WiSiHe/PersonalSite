import type { Meta, StoryObj } from "@storybook/react"

import Breadcrumbs from "./Breadcrumbs"

const meta: Meta<typeof Breadcrumbs> = {
    title: "Molecules/Navigation/Breadcrumbs",
    component: Breadcrumbs,
    tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
    args: {
        items: [
            { id: 1, label: "Home", path: "#" },
            { id: 2, label: "Trendy", path: "#" },
            { id: 3, label: "March 2022 Assets", path: "#" },
        ],
        isDisabled: false,
    },
}
