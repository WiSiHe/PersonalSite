import type { Meta, StoryObj } from "@storybook/react"

import Button from "./Button"

const meta: Meta<typeof Button> = {
    title: "Atoms/Button",
    component: Button,
    tags: ["autodocs"],

    render: ({ children = "placeholder", ...args }) => {
        return <Button {...args}>{children}</Button>
    },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
    args: {
        children: "Button",
    },
}

export const Disabled: Story = {
    args: {
        children: "Button",
        isDisabled: true,
    },
}

export const Outlined: Story = {
    args: {
        children: "Button",
        isOutlined: true,
    },
}
