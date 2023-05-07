import { RiFileAddLine } from 'react-icons/ri'
import { getPageName } from '@/utils/page/getPageName'
import { updateFunnelName } from '@/utils/funnel/updateFunnelName'
import { createPage } from '@/utils/page/createPage'
import { loadPage } from '@/utils/page/loadPage'

export default function FunnelView({ state }) {
  return (
    <div className="p-6">
      <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-2">Funnel</h4>
      <h2
        className="text-2xl font-bold pb-4 text-slate-900 pr-12"
        onBlur={() => {
          updateFunnelName(state)
        }}
        contentEditable="true"
        suppressContentEditableWarning={true}
      >
        {state.funnel.name.get()}
      </h2>
      <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3">Pages</h4>
      <div className="overflow-hidden">
        {state.funnel.pages.get() &&
          state.funnel.pages.get().map((id, index) => (
            <div
              key={index}
              onClick={() => {
                loadPage(state, id)
              }}
              className={`font-medium rounded-md truncate p-2 cursor-pointer hover:bg-orange-100 hover:text-orange-900 ${
                state.page.data.get() && id === state.page.data.get().id
                  ? 'bg-orange-100 text-orange-900 hover:bg-orange-100 hover:text-orange-900'
                  : 'text-slate-900'
              }`}
            >
              {getPageName(id)}
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          createPage(state)
        }}
        className="page-modal-close-button flex items-center text-sm mt-3"
      >
        <RiFileAddLine className="mr-2" /> <span>Add Page</span>
      </button>
    </div>
  )
}
