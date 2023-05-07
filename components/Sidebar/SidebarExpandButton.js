import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

export default function SidebarExpandButton({ state }) {
  return (
    <div
      id="expander"
      onClick={() => {
        state.sidebar.expanded.set(!state.sidebar.expanded.get())
      }}
    >
      {!state.sidebar.expanded.get() ? <BsArrowRight /> : <BsArrowLeft />}
    </div>
  )
}
