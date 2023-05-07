import { buildBreadcrumb } from '@/utils/utility/buildBreadcrumb'

export default function Breadcrumb({ state }) {
  return (
    state.active.current.get() &&
    state.active.selectedId.get() && (
      <div
        className="fixed bottom-0 left-0 flex space-x-4 bg-white rounded-tr-md py-3 px-4"
        style={{ left: !state.sidebar.expanded.get() ? 340 : 0, zIndex: 999999 }}
      >
        {buildBreadcrumb(state.active.selectedId.get(), state.page.data.get(), element => {
          if (element) {
            state.active.selectedId.set(element.id)
            state.active.current.set('editing')
          } else {
            state.active.selectedId.set(null)
            state.active.current.set(null)
          }
        })}
      </div>
    )
  )
}
