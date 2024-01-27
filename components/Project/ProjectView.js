import { RiFileAddLine } from 'react-icons/ri'
import { getPageName } from '@/utils/page/getPageName'
import { updateProjectName } from '@/utils/project/updateProjectName'
import { createPage } from '@/utils/page/createPage'
import { loadPage } from '@/utils/page/loadPage'

export default function ProjectView({ state }) {
  return (
    <>
      {!state.project.id && (
        <div className="p-12 text-center">
          <h3 className="text-2xl font-bold mb-1">No Project Loaded</h3>
          <p className="text-sm">Please click "new project" to get started or select an existing project.</p>
        </div>
      )}
      {state.project.id && (
        <div className="p-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-2">Project</h4>
          <h2
            className="text-2xl font-bold pb-4 text-slate-900 pr-12"
            onBlur={() => {
              updateProjectName(state)
            }}
            contentEditable="true"
            suppressContentEditableWarning={true}
          >
            {state.project.name.get()}
          </h2>
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3">Pages</h4>
          <div className="overflow-hidden">
            {state.project.pages.get() &&
              state.project.pages.get().map((id, index) => (
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
      )}
    </>
  )
}
