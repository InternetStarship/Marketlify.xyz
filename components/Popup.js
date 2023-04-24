/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { useState, useEffect } from 'react'

export default function Empty({ title, children, close = true, open = false }) {
  const [modal, setModal] = useState(open)

  useEffect(() => {
    setModal(open)
  }, [open])

  return (
    <>
      {modal && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-6">
              <h2 className="page-modal-title">{title}</h2>
              {close && (
                <div>
                  <button
                    onClick={() => {
                      setModal(false)
                    }}
                    className="page-modal-close-button"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}
