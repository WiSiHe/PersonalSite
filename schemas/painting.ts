import { ImageIcon } from "@sanity/icons"
import DescriptionTextGenerator from "components/sanity/DescriptionTextGenerator"
import { defineField, defineType } from "sanity"
import { FaWeibo } from "react-icons/fa"
import SEODescriptionGenerator from "components/sanity/SEODescriptionGenerator"

export default defineType({
  name: "painting",
  title: "Painting",
  icon: ImageIcon,
  type: "document",
  groups: [
    {
      name: "seo",
      title: "SEO",
      default: false,
      icon: FaWeibo,
    },
    {
      name: "media",
      title: "Media",
      default: false,
      icon: ImageIcon,
    },
    {
      name: "AI",
      title: "AI",
      default: false,
      icon: ImageIcon,
    },
    {
      name: "social",
      title: "Social",
      default: false,
      icon: ImageIcon,
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "seo",
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
      group: "seo",
      description: "The slug is used to generate the URL of the painting",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Primary Image",
      type: "image",
      group: "media",
      description: "The main image of the painting",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: ["AI"],
      components: {
        input: DescriptionTextGenerator,
      },
      description: "Description of the painting",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: ["seo", "AI"],
      description:
        "This description will be used in the meta description for SEO purposes",
      components: {
        input: SEODescriptionGenerator,
      },
    }),

    defineField({
      name: "images",
      title: "Images",
      type: "array",
      group: "media",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional images of the painting",
      //   validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "url",
      group: "media",
      description: "YouTube or Vimeo URL",
      // validation: (rule) => rule.required(),
    }),

    defineField({
      name: "format",
      title: "Format",
      type: "string",

      initialValue: "square",
      description: "Aspect ratio of the painting",
      validation: (rule) => rule.required(),
      options: {
        list: ["square", "landscape", "portrait"],
      },
    }),
    defineField({
      name: "redbubbleUrl",
      title: "Redbubble URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "society6Url",
      title: "Society6 URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "paintedAt",
      title: "Painted At",
      type: "datetime",
      description: "Date when the painting was painted",
      validation: (rule) => rule.required(),
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
