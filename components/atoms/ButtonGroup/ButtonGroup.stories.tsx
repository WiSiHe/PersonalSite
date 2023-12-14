import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { BiSortDown, BiSortUp } from "react-icons/bi"
import { FaRandom } from "react-icons/fa"

import ButtonGroup from "./ButtonGroup"

const items = [
    {
        label: "Random",
        value: "random",
        Icon: <FaRandom />,
    },
    {
        label: "Newest",
        value: "newest",
        Icon: <BiSortDown />,
    },
    {
        label: "Oldest",
        value: "oldest",
        Icon: <BiSortUp />,
    },
]

const ACTIVE_VALUE = "random"

const meta: Meta<typeof ButtonGroup> = {
    title: "Atoms/ButtonGroup",
    component: ButtonGroup,
    // tags: ["autodocs"],
    argTypes: {
        activeValue: {
            options: ["Normal", "Bold", "Italic"],
            mapping: {
                Bold: <b>Bold</b>,
                Italic: <i>Italic</i>,
            },
        },
    },
    render: function Render({ ...args }) {
        const [{ activeValue }, updateArgs] = useArgs()

        function onChange(value: string) {
            updateArgs({ activeValue: value })
        }

        return (
            <ButtonGroup
                activeValue={args.activeValue}
                items={args.items}
                handleChangeItem={(value) => onChange(value)}
            />
        )
    },
}

export default meta

type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
    args: {
        items,
        activeValue: "",
        handleChangeItem: () => {},
    },
}

export const Active: Story = {
    args: {
        ...Default.args,
        activeValue: ACTIVE_VALUE,
    },
}
