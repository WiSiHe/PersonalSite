import Main from "components/atoms/Main/Main"
import Meta from "components/atoms/Meta/Meta"
import { NextStudio } from "next-sanity/studio"
// import { NextStudioHead } from "next-sanity/studio/head"
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
      <Meta title="Studio" description="Sanity Studio" />
      {/* <Head>
        <NextStudioHead favicons={true} />
      </Head> */}
      <Main className="flex-col h-[95vh] pt-2">
        <NextStudio config={config}>
          <StudioProvider config={config}>
            {/* <GlobalStyle /> */}
            <StudioLayout />
          </StudioProvider>
        </NextStudio>
      </Main>
    </>
  )
}
