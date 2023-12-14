import type { Meta, StoryObj } from "@storybook/react"

import BreadCrumbs from "./BreadCrumbs"

const meta: Meta<typeof BreadCrumbs> = {
    title: "Molecules/Navigation/Breadcrumbs",
    component: BreadCrumbs,
    tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof BreadCrumbs>

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
