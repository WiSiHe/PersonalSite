// no check TS

import type { Meta, StoryObj } from "@storybook/react"

import GridStyleWrapper from "./GridStyleWrapper"

const meta: Meta<typeof GridStyleWrapper> = {
  title: "Atoms/GridStyleWrapper",
  component: GridStyleWrapper,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof GridStyleWrapper>

export const Default: Story = {}

export const WithChildren: Story = {
  //   render: (args) => (
  //     <GridStyleWrapper>
  //       <div>{args.content}</div>
  //     </GridStyleWrapper>
  //   ),
  args: {
    children: <p>Test</p>,
  },
}
