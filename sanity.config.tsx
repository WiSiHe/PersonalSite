import { visionTool } from "@sanity/vision"
import LogoQR from "components/atoms/icons/LogoQR"
import { apiVersion, dataset, projectId } from "lib/sanity.api"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { presentationTool } from "sanity/presentation"
import paintingType from "schemas/painting"
import projectType from "schemas/project"
import tagType from "schemas/tag"
import videoType from "schemas/video"

import { locate } from "@/sanity/plugins/locate"
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings"
import home from "@/sanity/schemas/singletons/home"

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "test"

const SANITY_STUDIO_PREVIEW_URL =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL || "http://localhost:1992"

export default defineConfig({
    basePath: "/studio",
    projectId: projectId || "",
    dataset: dataset || "",
    title,
    schema: {
        types: [
            // singletons
            home,
            // documents
            tagType,
            videoType,
            projectType,
            paintingType,
        ],
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
        // presentationTool({
        //     locate,
        //     previewUrl: {
        //         origin:
        //             typeof location === "undefined"
        //                 ? SANITY_STUDIO_PREVIEW_URL
        //                 : location.origin,
        //         draftMode: {
        //             enable: "/api/sanity-v2/draft",
        //             disable: "/api/sanity-v2/disable-draft",
        //         },
        //     },
        // }),
        presentationTool({
            // locate,
            previewUrl: SANITY_STUDIO_PREVIEW_URL,
        }),
        // Configures the global "new document" button, and document actions, to suit the Settings document singleton
        singletonPlugin([home.name]),

        // Vision lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
        // For when AI assist becoems available
        // assist(), For when AI assist becoems available
    ],
})
