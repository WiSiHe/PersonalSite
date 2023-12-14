import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"

import Accordion from "./Accordion"

const meta: Meta<typeof Accordion> = {
    title: "Atoms/Accordion",
    component: Accordion,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    // render: ({ children = "placeholder", ...args }) => {
    //     return <Accordion label={args.label}>{children}</Accordion>
    // },
    render: function Render({ children, ...args }) {
        const [{ isChecked }, updateArgs] = useArgs()

        function onChange() {
            updateArgs({ isChecked: !isChecked })
        }

        return <Accordion label={args.label}>{children}</Accordion>
    },
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
    args: {
        label: "Accordion",
        children: "Accordion content",
    },
}

export const Open: Story = {
    args: {
        ...Default.args,
    },
}
