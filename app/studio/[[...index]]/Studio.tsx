"use client"

import { NextStudio } from "next-sanity/studio"
import config from "sanity.config"

import Main from "@/components/atoms/Main/Main"

export default function Studio() {
    return (
        <Main className="flex-col h-[95vh] pt-2">
            <NextStudio config={config} />
        </Main>
    )
}
