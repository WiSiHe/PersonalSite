import type { Meta, StoryObj } from "@storybook/react"

import ActiveLink from "./ActiveLink"

const meta: Meta<typeof ActiveLink> = {
    title: "Atoms/ActiveLink",
    component: ActiveLink,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ActiveLink>

export const Default: Story = {
    args: {
        href: "/",
        children: "Home",
        scrollToTop: false,
        shallow: false,
    },
}
