export default function CanvasDisabledOverlay({ state }) {
  if (state.active.current.get() === '') return null

  return (
    <div
      className="w-full h-full hover:bg-slate-900 opacity-25 absolute z-20 cursor-pointer"
      onMouseOver={e => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onClick={e => {
        state.active.selectedId.set(null)
        state.active.current.set('')
      }}
    ></div>
  )
}
