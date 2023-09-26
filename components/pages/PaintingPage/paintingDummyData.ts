import { iSanityPainting } from "lib/models/objects/sanityPainting"

export const dummyPainting: iSanityPainting = {
    _id: "3890c2b5-8f53-41fa-a0e6-aa252c0ec7c7",
    description:
        "Saw a cool train picture from Switzerland, thought that it looked cool, I would love to take the train there someday!",
    format: "portrait",
    image: {
        _type: "image",
        asset: {
            _ref: "image-dd14c1f611bb4889a81f87653beff1350231d83c-4304x3572-jpg",
            _type: "reference",
        },
        crop: {
            _type: "sanity.imageCrop",
            bottom: 0,
            left: 0,
            right: 0.004065040650406471,
            top: 0,
        },
        hotspot: {
            _type: "sanity.imageHotspot",
            height: 0.7254013553404527,
            width: 0.5569105691056925,
            x: 0.27845528455284624,
            y: 0.5956191709082341,
        },
    },
    images: [
        {
            _key: "3c2710c75e22",
            _type: "image",
            asset: {
                _ref: "image-00ac07d6b7d41cb54c3824b878aaad6daefbca98-2532x2101-png",
                _type: "reference",
            },
        },
        {
            _key: "063ca00d4a41",
            _type: "image",
            asset: {
                _ref: "image-b950d83fdb354cf64c2b9913dd3beb88b67cacf8-2292x2160-png",
                _type: "reference",
            },
        },
    ],
    imagesCount: 2,
    redbubbleUrl: null,
    slug: "train-trip",
    society6Url: null,
    tagCount: 4,
    paintedAt: "2021-01-01",
    tagsV2: [
        {
            name: "Landscape",
        },
        {
            name: "Nature",
        },
        {
            name: "Travel",
        },
        {
            name: "Mountain",
        },
    ],
    title: "Train trip",
    video: null,
}
