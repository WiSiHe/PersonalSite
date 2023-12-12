import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

import Switch from "./Switch"

const meta: Meta<typeof Switch> = {
    title: "Atoms/Switch",
    component: Switch,
    tags: ["autodocs"],
    render: ({ children = "placeholder", ...args }) => {
        return <Switch {...args}>{children}</Switch>
    },
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
    args: {
        children: "Switch content",
        defaultSelected: false,
        isDisabled: false,
        name: "switch",
        onChange: () => undefined,
        value: "switch",
        isReadOnly: false,
        isSelected: false,
        autoFocus: false,
    },
}
