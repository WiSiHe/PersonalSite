import Navigation from "components/Navigation"
import Head from "next/head"
import { NextStudio } from "next-sanity/studio"
import { NextStudioHead } from "next-sanity/studio/head"
import React from "react"
import { StudioLayout, StudioProvider } from "sanity"
import config from "sanity.config"
// import { createGlobalStyle } from "styled-components"

// const GlobalStyle = createGlobalStyle(({ theme }) => ({
//   // html: { backgroundColor: theme.sanity.color.base.bg },
//   // html: { backgroundColor: "red" },
// }))

export default function StudioPage() {
  return (
    <>
      <Head>
        <NextStudioHead favicons={false} />
      </Head>

      <Navigation />
      <section className="p-4">
        <NextStudio config={config}>
          <StudioProvider config={config}>
            {/* <GlobalStyle /> */}
            <StudioLayout />
          </StudioProvider>
        </NextStudio>
      </section>
    </>
  )
}
