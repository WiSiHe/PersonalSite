import { UserIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "tag",
  title: "Tag",
  icon: UserIcon,
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
      description: "Short description of the tag",
      validation: (rule) =>
        rule
          .max(200)
          .min(10)
          .warning("Description should be between 10 and 200 characters"),
    }),
  ],
})
