/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Canvas from '../components/Canvas'
import Toolbar from '../components/Toolbar/Toolbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Head from '../components/Head'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import { ToastContainer } from 'react-toastify'
import { Tooltip } from 'react-tooltip'

export default function Builder() {
  const [funnel, setFunnel] = useState(null)
  const [page, setPage] = useState(null)
  const [page2, setPage2] = useState(null)
  const [pageName, setPageName] = useState('Untitled Page')

  const [current, setCurrent] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [viewport, setViewport] = useState('desktop')
  const [updated, setUpdated] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    fetch('/api/start-data', {
      method: 'GET',
    }).then(response => {
      response.json().then(data => {
        setFunnel(data.funnel)
        setPage(data.pages[0])
        setPage2(data.pages[1])
      })
    })
  }, [])

  function edit(element) {
    if (element) {
      setSelectedId(element.id)
      setCurrent('editing')
    } else {
      setSelectedId(null)
      setCurrent(null)
    }
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

  return (
    <main className="w-full h-screen overflow-hidden mainBG">
      <Head />

      <Toolbar
        page={page}
        viewport={viewport}
        updateViewport={value => {
          setViewport(value)
        }}
        load={updatePage}
        updateFullscreen={() => {
          setFullscreen(true)
        }}
        updateCurrent={value => {
          setCurrent(value)
        }}
        name={pageName}
      />
      <div className="flex flex-row">
        <Sidebar
          current={current}
          selectedId={selectedId}
          page={page}
          close={closeSidebar}
          updatePage={updatePage}
          updateCurrent={value => {
            setCurrent(value)
          }}
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
              name={pageName}
              updateName={name => {
                setPageName(name)
              }}
              updateCurrent={value => {
                setCurrent(value)
              }}
            />
          )}
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        theme="dark"
      />

      <Tooltip id="tooltip" />
    </main>
  )
}
