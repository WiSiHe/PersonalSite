import type { Meta, StoryObj } from "@storybook/react"

import Modal from "./Modal"

const meta: Meta<typeof Modal> = {
    title: "Atoms/Modal",
    component: Modal,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        layout: "centered",
    },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
    args: {
        children: "Modal",
        isOpen: true,
        closeModal: () => {
            console.log("close")
        },
    },
}

export const Open: Story = {
    args: {
        children: "Modal",
        isOpen: true,
        closeModal: () => {
            console.log("close")
        },
    },
}
