import type { Meta, StoryObj } from "@storybook/react"

import ProjectStatus from "./ProjectStatus"

const meta: Meta<typeof ProjectStatus> = {
  title: "Atoms/ProjectStatus",
  component: ProjectStatus,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof ProjectStatus>

export const Default: Story = {}

export const InProgress: Story = {
  args: {
    status: "inProgress",
  },
}

export const Completed: Story = {
  args: {
    status: "completed",
  },
}

export const OnHold: Story = {
  args: {
    status: "onHold",
  },
}

export const Cancelled: Story = {
  args: {
    status: "cancelled",
  },
}

export const Abandoned: Story = {
  args: {
    status: "abandoned",
  },
}

export const Unknown: Story = {
  args: {
    status: "unknown",
  },
}

export const NotStarted: Story = {
  args: {
    status: "notStarted",
  },
}

export const Planned: Story = {
  args: {
    status: "planned",
  },
}
