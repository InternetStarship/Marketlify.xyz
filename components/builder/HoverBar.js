/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { FaArrowUp, FaArrowDown, FaPlus, FaCog } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function HoverBar({ position, page, updatePage }) {
  const [updatedPosition, setUpdatedPosition] = useState(position)

  useEffect(() => {
    setUpdatedPosition(position)
  }, [position])

  function add() {
    // todo make this so its not hardcoded
    page.sections[0].rows[0].columns[0].elements.push({
      id: 499,
      type: 'text',
      content: 'New Element World!',
      style: {
        color: 'blue',
        fontFamily: 'sans-serif',
        fontSize: '97px',
        fontWeight: 400,
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'left',
        lineHeight: 1.5,
        letterSpacing: '0px',
      },
    })
    updatePage(page)
    console.log('add')
  }

  function moveUp() {
    console.log('moveUp')
  }

  function moveDown() {
    console.log('moveDown')
  }

  function edit() {
    console.log('edit')
  }

  return (
    <main
      id="hoverBar"
      className="border-2 border-blue-500 fixed"
      style={{
        width: updatedPosition.width,
        height: updatedPosition.height,
        top: updatedPosition.top,
        left: updatedPosition.left,
        zIndex: 999999,
      }}
    >
      <div
        id="hoverBarTop"
        onClick={() => {
          edit()
        }}
      >
        <div className="flex">
          <div
            onClick={() => {
              moveUp()
            }}
            className="bg-blue-500 p-1 rounded-sm text-white"
          >
            <FaArrowUp />
          </div>
          <div
            onClick={() => {
              moveDown()
            }}
            className="bg-blue-500 p-1 rounded-sm text-white"
          >
            <FaArrowDown />
          </div>
        </div>

        <div className="flex">
          <div className="bg-blue-500 p-1 rounded-sm text-white">
            <FaCog />
          </div>
        </div>
      </div>

      <div id="hoverBarBottom">
        <div
          onClick={() => {
            add()
          }}
          className="bg-blue-500 p-1 rounded-full text-white"
        >
          <FaPlus />
        </div>
      </div>
    </main>
  )
}
