import { ImageIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "painting",
  title: "Painting",
  icon: ImageIcon,
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
    // defineField({
    //   name: "name",
    //   title: "Name",
    //   type: "string",
    //   validation: (rule) => rule.required(),
    // }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Title of the painting",
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
      description: "The slug is used to generate the URL of the painting",
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
      description: "Short description of the painting",
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .min(10)
          .warning("Description should be between 10 and 200 characters"),
    }),
    defineField({
      name: "image",
      title: "Primary Image",
      type: "image",
      description: "The main image of the painting",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional images of the painting",
      //   validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "url",
      description: "YouTube or Vimeo URL",
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured paintings will be displayed on the home page",
      options: {
        layout: "checkbox",
      },
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      initialValue: "square",
      validation: (rule) => rule.required(),
      options: {
        list: ["square", "landscape", "portrait"],
      },
    }),
    defineField({
      name: "redbubbleUrl",
      title: "Redbubble URL",
      type: "url",
      fieldset: "links",
    }),
    defineField({
      name: "society6Url",
      title: "Society6 URL",
      type: "url",
      fieldset: "links",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      fieldset: "links",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter URL",
      type: "url",
      fieldset: "links",
    }),
    defineField({
      name: "tagsV2",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
      description: "Tags for the painting",
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "format",
      media: "image",
      tagsV2: "tagsV2",
      images: "images.0",
    },
    prepare({ title, subtitle = "", media, tagsV2 = [], images = [] }) {
      const amountofTags = tagsV2.length
      const amountofPaintings = images.length

      return {
        title,
        subtitle:
          amountofPaintings > 0
            ? `${subtitle} - ${amountofTags} tags - ${amountofPaintings} extra paintings`
            : `${subtitle} - ${amountofTags} tags`,
        media,
      }
    },
  },
})
