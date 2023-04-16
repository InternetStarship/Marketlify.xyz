/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Canvas from '../components/Canvas'
import Toolbar from '../components/Toolbar/Toolbar'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import Head from 'next/head'

export default function Builder() {
  const [page, setPage] = useState(null)
  const [current, setCurrent] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [viewport, setViewport] = useState('desktop')
  const [updated, setUpdated] = useState(null)

  useEffect(() => {
    fetch('/api/testdata', {
      method: 'GET',
    }).then(response => {
      response.json().then(data => {
        setPage(data)
      })
    })
  }, [])

  function edit(element) {
    setSelectedId(element.id)
    setCurrent('editing')
  }

  function settings() {
    setCurrent('settings')
  }

  function closeSidebar() {
    setCurrent('')
  }

  function updatePage(updated) {
    setPage(updated)
    setUpdated(Date.now())
  }

  function load(data) {
    setPage(data)
    setUpdated(Date.now())
  }

  return (
    <main className="w-full h-screen overflow-hidden bg-slate-300">
      <Head>
        <title>Marketlify - The Free Page Builder</title>
        <link rel="icon" type="image/png" href="/images/icon.png" />
        <meta
          name="description"
          content="Create web pages without signing up, save locally, export and host anywhere."
        />
      </Head>

      <Toolbar
        page={page}
        viewport={viewport}
        updateViewport={value => {
          setViewport(value)
        }}
        load={load}
      />
      <div className="flex flex-row">
        <Sidebar
          current={current}
          selectedId={selectedId}
          page={page}
          close={closeSidebar}
          updatePage={updatePage}
        />
        <div className="w-full">
          {page && (
            <Canvas page={page} edit={edit} viewport={viewport} updated={updated} updatePage={updatePage} />
          )}
        </div>
      </div>
    </main>
  )
}
