import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

import OTPForm from "./OTPForm"

const meta: Meta<typeof OTPForm> = {
  title: "Molecules/OTPFormV2",
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

const OTPFormWithHooks = () => {
  // Sets the hooks for both the label and primary props
  const [value, setValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: string) => {
    setValue(e)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 3000)
  }

  return (
    <OTPForm
      inputCode={value}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  )
}

export const Default: Story = {
  render: () => <OTPFormWithHooks />,
}
