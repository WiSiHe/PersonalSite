// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import { DefaultDocumentNodeResolver } from "sanity/desk"
import authorType from "schemas/author"
import postType from "schemas/post"
import paintingType from "schemas/painting"

import AuthorAvatarPreviewPane from "./AuthorAvatarPreviewPane"

import PaintingPreviewPane from "./PaintingPreviewPane"
import PaintingPage from "components/pages/PaintingPage"
import PaintingPagePreview from "components/pages/PaintingPagePreview"

export const previewDocumentNode = ({
    apiVersion,
    previewSecretId,
}: {
    apiVersion: string
    previewSecretId: `${string}.${string}`
}): DefaultDocumentNodeResolver => {
    return (S, { schemaType }) => {
        switch (schemaType) {
            case paintingType.name:
                return (
                    S.document()
                        // .documentId(documentId)
                        .schemaType(schemaType)
                        .views([
                            S.view.form(),
                            S.view
                                .component(({ document }) => (
                                    <PaintingPreviewPane
                                        slug={document.displayed.slug?.current}
                                        apiVersion={apiVersion}
                                        previewSecretId={previewSecretId}
                                        id={document.displayed._id}
                                        // painting={document.displayed}
                                    />
                                ))
                                .options({
                                    previewURL: (doc: any) => {
                                        return `/painting/${doc.displayed.slug.current}`
                                    },
                                    url: (doc: any) => {
                                        return `/painting/${doc.displayed.slug.current}`
                                    },
                                })
                                .title("Preview Painting"),
                            // S.view
                            //   .component(
                            //     ({ document }) =>
                            //       document.displayed && (
                            //         <PaintingPagePreview painting={document.displayed} />
                            //       )
                            //   )
                            //   .options({
                            //     previewURL: (doc: any) => {
                            //       return `/painting/${doc.displayed.slug.current}`
                            //     },
                            //   })
                            //   .title("Realtime Preview"),
                        ])
                )
            default:
                return null
        }
    }
}
