import { HomeIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
    name: "home",
    title: "Home",
    type: "document",
    icon: HomeIcon,

    // Uncomment below to have edits publish automatically as you type
    // liveEdit: true,
    fields: [
        defineField({
            name: "title",
            description: "This field is the title of your personal website.",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "overview",
            description:
                "Used both for the <meta> description tag for SEO, and the personal website subheader.",
            title: "Description",
            type: "array",
            of: [
                // Paragraphs
                defineArrayMember({
                    lists: [],
                    marks: {
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "Url",
                                    },
                                ],
                            },
                        ],
                        decorators: [
                            {
                                title: "Italic",
                                value: "em",
                            },
                            {
                                title: "Strong",
                                value: "strong",
                            },
                        ],
                    },
                    styles: [],
                    type: "block",
                }),
            ],
            validation: (rule) => rule.max(155).required(),
        }),
        defineField({
            name: "paintingsTitle",
            title: "Paintings title",
            description:
                "This is the title that will appear on your paintings page.",
            type: "string",
        }),
        defineField({
            name: "paintingsDescription",
            title: "Paintings description",
            description:
                "This is the description that will appear on your paintings page.",
            type: "array",
            of: [
                // Paragraphs
                defineArrayMember({
                    lists: [],
                    marks: {
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "Url",
                                    },
                                ],
                            },
                            {
                                name: "internalLink",
                                title: "Internal link",
                                type: "object",
                                fields: [
                                    {
                                        name: "reference",
                                        type: "string",
                                        title: "Reference",
                                    },
                                ],
                            },
                        ],
                        decorators: [
                            {
                                title: "Italic",
                                value: "em",
                            },
                            {
                                title: "Strong",
                                value: "strong",
                            },
                        ],
                    },
                    styles: [],
                    type: "block",
                }),
            ],
            validation: (rule) => rule.max(155).required(),
        }),
        defineField({
            name: "showcasePaintings",
            title: "Showcase paintings",
            description:
                "These are the paintings that will appear first on your landing page.",
            type: "array",
            of: [
                defineArrayMember({
                    type: "reference",
                    to: [{ type: "painting" }],
                }),
            ],
        }),
        defineField({
            name: "projectsDescription",
            title: "Projects description",
            description:
                "This is the description that will appear on your projects page.",
            type: "array",
            of: [
                // Paragraphs
                defineArrayMember({
                    lists: [],
                    marks: {
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "Url",
                                    },
                                ],
                            },
                            {
                                name: "internalLink",
                                title: "Internal link",
                                type: "object",
                                fields: [
                                    {
                                        name: "reference",
                                        type: "string",
                                        title: "Reference",
                                    },
                                ],
                            },
                        ],
                        decorators: [
                            {
                                title: "Italic",
                                value: "em",
                            },
                            {
                                title: "Strong",
                                value: "strong",
                            },
                        ],
                    },
                    styles: [],
                    type: "block",
                }),
            ],
            validation: (rule) => rule.max(155).required(),
        }),
        defineField({
            name: "projectsTitle",
            title: "Projects title",
            description:
                "This is the title that will appear on your projects page.",
            type: "string",
        }),
        defineField({
            name: "showcaseProjects",
            title: "Showcase projects",
            description:
                "These are the projects that will appear first on your landing page.",
            type: "array",
            of: [
                defineArrayMember({
                    type: "reference",
                    to: [{ type: "project" }],
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare({ title }) {
            return {
                subtitle: "Home",
                title,
            }
        },
    },
})
