/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Canvas from '../components/Canvas'
import Toolbar from '../components/Toolbar/Toolbar'
import Sidebar from '../components/Sidebar'
import Head from '../components/Head'
import { useState, useEffect } from 'react'
import _ from 'lodash'

export default function Builder() {
  const [page, setPage] = useState(null)
  const [current, setCurrent] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [viewport, setViewport] = useState('desktop')
  const [updated, setUpdated] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)

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
      <Head />

      <Toolbar
        page={page}
        viewport={viewport}
        updateViewport={value => {
          setViewport(value)
        }}
        load={load}
        updateFullscreen={() => {
          setFullscreen(true)
        }}
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
            <Canvas
              page={page}
              edit={edit}
              current={current}
              viewport={viewport}
              updated={updated}
              updatePage={updatePage}
              selectedId={selectedId}
              updateSelectedId={id => {
                setSelectedId(id)
              }}
              fullscreen={fullscreen}
              updateFullscreen={() => {
                setFullscreen(false)
              }}
            />
          )}
        </div>
      </div>
    </main>
  )
}
