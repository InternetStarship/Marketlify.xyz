/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Head from 'next/head'

export default function Header() {
  return (
    <Head>
      <title>Marketlify - The Free Page Builder</title>
      <link rel="icon" type="image/png" href="/images/icon.png" />
      <meta
        name="description"
        content="Create web pages without signing up, save locally, export and host anywhere."
      />
    </Head>
  )
}
