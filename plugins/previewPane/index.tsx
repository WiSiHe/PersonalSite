// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import { DefaultDocumentNodeResolver } from "sanity/desk"
import paintingType from "schemas/painting"

import PaintingPreviewPane from "./PaintingPreviewPane"

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
                return S.document()
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
                                    return `/paintings/${doc.displayed.slug.current}`
                                },
                                url: (doc: any) => {
                                    return `/paintings/${doc.displayed.slug.current}`
                                },
                            })
                            .title("Preview Painting"),
                    ])
            default:
                return null
        }
    }
}
