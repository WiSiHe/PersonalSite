import type { Meta, StoryObj } from "@storybook/react"

import {
    dummyNSFWPainting,
    dummyPainting,
    dummyPaintingWithALl,
    dummyPaintingWithStoreLinks,
    dummyPaintingWithVideo,
} from "./dummyData"
import Painting from "./Painting"

const meta: Meta<typeof Painting> = {
    title: "Molecules/Painting",
    component: Painting,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        layout: "padded",
    },
}

export default meta

type Story = StoryObj<typeof Painting>

export const Default: Story = {}

export const WithMultiplePaintings: Story = {
    args: {
        paintingData: dummyPainting,
        shouldBeLazy: false,
        storybook: true,
    },
    render: (args) => (
        <section className="aspect-video">
            <Painting {...args} />
        </section>
    ),
}

export const WithLazyLoading: Story = {
    args: {
        paintingData: dummyPainting,
        shouldBeLazy: false,
        storybook: true,
    },
    render: (args) => (
        <section className="aspect-video">
            <Painting {...args} />
        </section>
    ),
}

export const WithVideo: Story = {
    args: {
        paintingData: dummyPaintingWithVideo,
        shouldBeLazy: false,
        storybook: true,
    },
    render: (args) => (
        <section className="aspect-video">
            <Painting {...args} />
        </section>
    ),
}

export const WithStoreLink: Story = {
    args: {
        paintingData: dummyPaintingWithStoreLinks,
        shouldBeLazy: false,
        storybook: true,
    },
    render: (args) => (
        <section className="aspect-video">
            <Painting {...args} />
        </section>
    ),
}

export const WithNSFWLink: Story = {
    args: {
        paintingData: dummyNSFWPainting,
        shouldBeLazy: false,
        storybook: true,
    },
    render: (args) => (
        <section className="aspect-video">
            <Painting {...args} />
        </section>
    ),
}

export const WithEverything: Story = {
    args: {
        paintingData: dummyPaintingWithALl,
        shouldBeLazy: false,
        storybook: true,
    },
    render: (args) => (
        <section className="aspect-video">
            <Painting {...args} />
        </section>
    ),
}
