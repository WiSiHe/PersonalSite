import Document, { Head, Html, Main, NextScript } from "next/document"
import React from "react"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,500&family=Roboto&display=swap"
            rel="stylesheet"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
