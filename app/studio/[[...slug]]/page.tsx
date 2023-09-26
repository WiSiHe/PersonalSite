"use client"
import Main from "components/atoms/Main/Main"
import { NextStudio } from "next-sanity/studio"
import { StudioLayout, StudioProvider } from "sanity"
import config from "sanity.config"

export default async function StudioPage() {
    return (
        <Main className="flex-col h-[95vh] pt-2">
            <NextStudio config={config}>
                <StudioProvider config={config}>
                    <StudioLayout />
                </StudioProvider>
            </NextStudio>
        </Main>
    )
}
