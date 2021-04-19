import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const DEFAULT_TAGS = {
  title: "WiSiHe - Design",
  description: "The art of Henrik Wilhelm Sissener",
  image: "https://wisihe.no/images/woods.png",
};

const Meta = ({
  title,
  description,
  image,
  ogTitle,
  ogDescription,
  ogImage,
  jsonLd,
}) => {
  return (
    <Head>
      <title>{title ? `${title} - WiSiHe` : DEFAULT_TAGS.title}</title>
      <link rel="icon" href="/favicon.png" />
      <meta
        name="description"
        content={description || DEFAULT_TAGS.description}
      />
      <meta
        property="og:title"
        content={ogTitle || title || DEFAULT_TAGS.title}
        key="title"
      />
      <meta
        property="og:description"
        content={ogDescription || description || DEFAULT_TAGS.description}
        key="description"
      />
      <meta
        property="og:image"
        content={ogImage || image || DEFAULT_TAGS.image}
        key="image"
      />
      <meta property="og:url" content="https://wisihe.no" key="url" />
      {jsonLd && (
        <script
          key={`jobJSON-${title}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
    </Head>
  );
};

Meta.defaultProps = {
  title: "",
  description: "",
  image: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  jsonLd: "",
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
  jsonLd: PropTypes.string,
};

export default Meta;
