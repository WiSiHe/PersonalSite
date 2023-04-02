import { PackageIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

import { Stack, Text, TextInput } from "@sanity/ui"

import tagType from "./tag"
import SanityAI from "components/molecules/SanityAI/SanityAI"

export default defineType({
  name: "project",
  title: "Project",
  icon: PackageIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the project",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      description: "Title of the project",
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
      description: "The slug is used to generate the URL of the project",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "inProgress",
      description: "Status of the project",
      options: {
        list: [
          { title: "In Progress", value: "inProgress" },
          { title: "Completed", value: "completed" },
          { title: "On Hold", value: "onHold" },
          { title: "Cancelled", value: "cancelled" },
          { title: "Abandoned", value: "abandoned" },
          { title: "Unknown", value: "unknown" },
          { title: "Not Started", value: "notStarted" },
          { title: "Planned", value: "planned" },
        ],
      },
    }),

    defineField({
      name: "description",
      title: "SEO Description",
      type: "text",
      description: "Short description of the project",
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .min(10)
          .warning("Description should be between 10 and 200 characters"),
    }),
    defineField({
      name: "projectStart",
      title: "Project Start",
      type: "date",
      description: "Start date of the project",
      //   validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectEnd",
      title: "Project End",
      type: "date",
      description: "End date of the project",
      //   validation: (rule) => rule.required(),
      //   Hide if status is not completed or cancelled or abandoned
      hidden: ({ parent }) => {
        return (
          parent.status !== "completed" &&
          parent.status !== "cancelled" &&
          parent.status !== "abandoned"
        )
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      description: "Content of the project",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Image of the project",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "connectedPaintings",
      title: "Connected Paintings",
      type: "array",
      description: "Paintings connected to the project",
      of: [{ type: "reference", to: { type: "painting" } }],
    }),

    defineField({
      name: "extraImages",
      title: "Extra Images",
      type: "array",
      description: "Extra images of the project",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "connectedVideo",
      title: "Connected Video",
      type: "reference",
      to: [{ type: "video" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: tagType.name } }],
      description: "Tags for the video",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      components: {
        input: (props) => {
          const { elementProps, value = "" } = props

          const { onChange, ref } = elementProps

          return (
            <Stack space={2}>
              {/* <Text>Characters: {value.length}</Text> */}
              <SanityAI
                value={value}
                // handleChange={handleChange}
                inputRef={ref}
              />
              ChatGPT:
              <TextInput {...elementProps} />
            </Stack>
          )
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
})
