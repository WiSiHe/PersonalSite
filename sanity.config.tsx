import { assist } from "@sanity/assist"
import { visionTool } from "@sanity/vision"
import LogoQR from "components/atoms/icons/LogoQR"
import { apiVersion, dataset, previewSecretId, projectId } from "lib/sanity.api"
import { productionUrl } from "plugins/productionUrl"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { presentationTool } from "sanity/presentation"
import paintingType from "schemas/painting"
import projectType from "schemas/project"
import tagType from "schemas/tag"
import videoType from "schemas/video"

import { locate } from "./sanity/plugins/locate"
import { pageStructure, singletonPlugin } from "./sanity/plugins/settings"
import home from "./sanity/schemas/singletons/home"

const title =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
    "Next.js Blog with Sanity.io"

const SANITY_STUDIO_PREVIEW_URL =
    process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:1992"

export default defineConfig({
    basePath: "/studio",
    projectId: projectId || "",
    dataset: dataset || "",
    title,
    schema: {
        // If you want more content types, you can add them to this array
        types: [home, paintingType, tagType, videoType, projectType],
    },
    studio: {
        components: {
            logo: () => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <LogoQR
                        style={{ fill: "white" }}
                        width="2.5rem"
                        height="2.5rem"
                    />
                    <p>WiSiHe</p>
                </div>
            ),
        },
    },
    plugins: [
        deskTool({
            structure: pageStructure([home]),
        }),
        presentationTool({
            locate,
            previewUrl: {
                origin:
                    typeof location === "undefined"
                        ? SANITY_STUDIO_PREVIEW_URL
                        : location.origin,
                draftMode: {
                    enable: "/api/sanity-v2/draft",
                },
            },
        }),
        singletonPlugin([home.name]),

        productionUrl({
            apiVersion,
            previewSecretId,
            types: [paintingType.name, videoType.name, projectType.name],
        }),

        visionTool({ defaultApiVersion: apiVersion }),
        assist(),
    ],
})
