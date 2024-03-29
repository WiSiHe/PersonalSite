import { DocumentVideoIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

import tagType from "./tag"
import VideoDescriptionGenerator from "components/sanity/VideoDescriptionGenerator"

export default defineType({
    name: "video",
    title: "Video",
    icon: DocumentVideoIcon,
    type: "document",
    fieldsets: [
        {
            name: "links",
            title: "Social Media Links",
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "Title of the video",
            validation: (rule) =>
                rule
                    .required()
                    .max(50)
                    .min(5)
                    .warning("Title should be between 5 and 50 characters"),
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            description: "The slug is used to generate the URL of the video",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            components: {
                input: VideoDescriptionGenerator,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "videoUrl",
            title: "Video URL",
            type: "string",
            description: "The URL of the video",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
            description: "The thumbnail of the video",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "linkedPainting",
            title: "Linked Painting",
            type: "reference",
            to: [{ type: "painting" }],
            description: "The painting that is linked to this video",
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "reference", to: { type: "tag" } }],
            description: "Tags for the video",
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "description",
            media: "thumbnail",
        },
    },
})
