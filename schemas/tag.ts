import { TagIcon } from "@sanity/icons"
import TagDescriptionGenerator from "components/sanity/TagDescriptionGenerator"
import { defineField, defineType } from "sanity"

export default defineType({
    name: "tag",
    title: "Tag",
    icon: TagIcon,
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            components: {
                input: TagDescriptionGenerator,
            },
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "description",
            media: "icon",
        },
    },
})
