/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from "@storybook/react"

import Avatar from "./Avatar"

const meta: Meta<typeof Avatar> = {
    title: "Atoms/Avatar",
    component: Avatar,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
    args: {
        label: "John Doe",
    },
}

export const Small: Story = {
    args: {
        label: "John Doe",
        size: "small",
    },
}

export const Primary: Story = {
    args: {
        label: "John Doe",
        color: "primary",
    },
}

export const Secondary: Story = {
    args: {
        label: "John Doe",
        color: "secondary",
    },
}

export const Tertiary: Story = {
    args: {
        label: "John Doe",
        color: "tertiary",
    },
}

export const Image: Story = {
    args: {
        label: "John Doe",
        Image: (
            <img
                src="https://source.unsplash.com/random/100x100"
                alt="avatar"
                className="object-cover w-full h-full"
            />
        ),
    },
}
