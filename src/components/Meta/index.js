import React from 'react'
import Head from 'next/head'

function Meta({ title, description, ogTitle, ogDescription, ogImage, url }) {

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta property="og:type" content="website" />
      {/*<link rel="manifest" href="/manifest.json" />*/}
      <meta
        name="description"
        content={description}
      />
      <meta
        property="og:title"
        content={ogTitle}
      />
      <meta
        property="og:description"
        content={ogDescription}
      />
      <meta
        property="og:url"
        content={url}
      />
      <meta
        property="og:image"
        content={ogImage}
      />
      <meta
        name="twitter:site"
        content={url}
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content={ogTitle}
      />
      <meta
        name="twitter:description"
        content={ogDescription}
      />
      <meta
        name="twitter:image"
        content={ogImage}
      />
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Uku.kg',
  description: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  url: process.env.NEXT_PUBLIC_HOST,
};

export default Meta
