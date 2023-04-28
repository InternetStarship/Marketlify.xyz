import { useState, useEffect } from 'react'
import { RiFileAddLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'
import { getPage } from '@/utils/getPage'
import { getPageName } from '@/utils/getPageName'
import { updateFunnelName } from '@/utils/updateFunnelName'
import { createPage } from '@/utils/createPage'
import Panel from './Panel'
import Settings from './Settings'
import Layers from './Layers'
import CustomCode from './CustomCode'

export default function Sidebar({
  current,
  page,
  funnel,
  close,
  selectedId,
  updatePage,
  updateCurrent,
  updateFunnel,
  updateUndoHistory,
}) {
  const [selected, setSelected] = useState(current)

  useEffect(() => {
    setSelected(current)
  }, [current])

  return (
    <main id="sidebar">
      {selected === 'editing' && (
        <Panel
          page={page}
          close={close}
          selectedId={selectedId}
          updatePage={updatePage}
          updateCurrent={updateCurrent}
        />
      )}
      {selected === 'settings' && (
        <Settings updateCurrent={updateCurrent} page={page} updatePage={updatePage} />
      )}
      {selected === 'custom-code' && <CustomCode page={page} updateCurrent={updateCurrent} />}
      {selected === 'layers' && <Layers updateCurrent={updateCurrent} page={page} updatePage={updatePage} />}
      {selected === '' && funnel && (
        <div className="p-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-2">Funnel</h4>
          <h2
            className="text-2xl font-bold pb-4 text-slate-900 pr-12"
            onBlur={() => {
              updateFunnelName(funnel, toast('Funnel name has been updated.'))
            }}
            contentEditable="true"
            suppressContentEditableWarning={true}
          >
            {funnel.name}
          </h2>

          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3">Pages</h4>
          <div className="overflow-hidden">
            {funnel.pages.map((id, index) => (
              <div
                key={index}
                onClick={() => {
                  const thepage = getPage(id)
                  updatePage(thepage)
                  updateUndoHistory([cloneDeep(thepage)])
                  toast('Page has been loaded.')
                }}
                className={`font-medium rounded-md truncate p-2 cursor-pointer hover:bg-orange-100 hover:text-orange-900 ${
                  page && id === page.id
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
                updatePage(pageData)
                updateFunnel(cloneDeep(funnel))
                toast('Page has been added to funnel.')
                updateUndoHistory([pageData])
              }, funnel)
            }}
            className="page-modal-close-button flex items-center text-sm mt-3"
          >
            <RiFileAddLine className="mr-2" /> <span>Add Page</span>
          </button>
        </div>
      )}
    </main>
  )
}
