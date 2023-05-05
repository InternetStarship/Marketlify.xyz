import { useEffect, useRef } from 'react'
import { cloneDeep } from 'lodash'

export function useUndo(state) {
  const prevPageRef = useRef()

  useEffect(() => {
    const currentPage = state.page.content.get()
    prevPageRef.current = currentPage

    if (!state.undo.isAction.get() && prevPageRef.current) {
      state.undo.history.set(prevHistory => {
        const newHistory = [...prevHistory, prevPageRef.current]
        const startIndex = Math.max(newHistory.length - 4, 0)
        return cloneDeep(newHistory.slice(startIndex))
      })
    }
    state.undo.isAction.set(false)
  }, [state])
}
