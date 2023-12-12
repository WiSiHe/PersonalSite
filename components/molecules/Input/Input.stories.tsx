import type { Meta, StoryObj } from "@storybook/react"

import Input from "./Input"

const meta: Meta<typeof Input> = {
    title: "Molecules/Input",
    component: Input,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        layout: "centered",
    },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
    args: {
        type: "text",
        label: "Email",
        description: "",
        isRequired: false,
        isInvalid: false,
        isReadOnly: false,
        autoFocus: false,
        defaultValue: "",
        autoComplete: "off",
        maxLength: 100,
        minLength: 0,
        inputMode: "text",
        name: "email",
        validationBehavior: "native",
        validate: () => undefined,
    },
}
