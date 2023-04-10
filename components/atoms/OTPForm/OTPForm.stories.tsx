import type { Meta, StoryObj } from "@storybook/react"

import OTPForm from "./OTPForm"

const meta: Meta<typeof OTPForm> = {
  title: "Atoms/OTPForm",
  component: OTPForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    // layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof OTPForm>

// const [inputCode, setInputCode] = useState("")

// const handleChange = (inputValue: string) => {
//   if (inputValue.length <= 6) {
//     setInputCode(inputValue)
//   }
// }

// const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault()
//   if (inputCode.length === 6) {
//     // submit code to the backend
//   } else {
//     // handle error
//   }
// }

// const

export const Default: Story = {}
