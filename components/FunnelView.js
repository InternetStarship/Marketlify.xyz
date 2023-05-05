import { RiFileAddLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'
import { getPage } from '@/utils/getPage'
import { getPageName } from '@/utils/getPageName'
import { updateFunnelName } from '@/utils/updateFunnelName'
import { createPage } from '@/utils/createPage'

export default function FunnelView({ state }) {
  return (
    <div className="p-6">
      <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-2">Funnel</h4>
      <h2
        className="text-2xl font-bold pb-4 text-slate-900 pr-12"
        onBlur={() => {
          updateFunnelName(state.funnel.get(), toast('Funnel name has been updated.'))
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
                const thepage = getPage(id)
                state.page.content.set(thepage)
                state.undo.history.set([cloneDeep(thepage)])
                toast('Page has been loaded.')
              }}
              className={`font-medium rounded-md truncate p-2 cursor-pointer hover:bg-orange-100 hover:text-orange-900 ${
                state.page.content.get() && id === state.page.content.get().id
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
          createPage(pageData => {
            state.page.content.set(pageData)
            state.funnel.set(cloneDeep(state.funnel.get()))
            toast('Page has been added to funnel.')
            state.undo.history.set([pageData])
          }, state.funnel.get())
        }}
        className="page-modal-close-button flex items-center text-sm mt-3"
      >
        <RiFileAddLine className="mr-2" /> <span>Add Page</span>
      </button>
    </div>
  )
}
