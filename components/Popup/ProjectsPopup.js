import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineCopy } from 'react-icons/ai'
import { getProjects } from '@/utils/project/getProjects'
import { removeProject } from '@/utils/project/removeProject'
import { cloneProject } from '@/utils/project/cloneProject'
import { loadProject } from '@/utils/project/loadProject'

function ProjectsPopup({ state }) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setProjects(getProjects())
  }, [])

  const close = () => {
    state.popup.open.set(false)
    state.popup.type.set('')
  }

  const search = event => {
    const value = event.target.value
    if (value) {
      document.querySelectorAll('.project').forEach(project => {
        const name = project.getAttribute('data-name')
        if (!name.includes(value)) {
          project.classList.add('hidden')
        }
      })
    } else {
      document.querySelectorAll('.project').forEach(project => {
        project.classList.remove('hidden')
      })
    }
  }

  const duplicate = (e, projectID) => {
    e.stopPropagation()
    cloneProject(projectID)
    setProjects(getProjects())
    toast('Page has been duplicated.')
  }

  const remove = (e, projectID) => {
    e.stopPropagation()
    const confirm = window.confirm('Are you sure you want to delete this project and all of its pages?')
    if (confirm) {
      removeProject(projectID)
      setProjects(getProjects())
      toast('Page has been deleted.')
    }
  }

  return (
    <>
      {state.popup.open.get() && state.popup.type.get() === 'projects' && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-4">
              <h2 className="page-modal-title">Projects</h2>
              {state.project.id.get() && (
                <div>
                  <button onClick={close} className="page-modal-close-button">
                    Close
                  </button>
                </div>
              )}
              {!state.project.id.get() && (
                <div>
                  <button
                    onClick={() => {
                      state.popup.type.set('new-project')
                    }}
                    className="page-modal-close-button"
                  >
                    New Project
                  </button>
                </div>
              )}
            </div>

            {projects.length > 0 && (
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full p-2 active:outline-none border rounded shadow-xs mb-2"
                defaultValue={''}
                onChange={search}
              />
            )}

            <div className="page-list">
              {projects.length === 0 && (
                <div className="px-12 py-3">
                  <h3 className="mb-6 text-xl font-bold">Oops! No projects here...yet! 🤔</h3>
                  <p className="mb-6 text-lg">
                    This is where all your crafted web pages will reside, ready for easy access - even when
                    you're offline.
                  </p>
                  <p className="mb-6 text-lg">
                    To begin your page-making adventure, dive into our user-friendly page builder and hit
                    'save' to store your masterpiece safely in your local browser.
                  </p>
                </div>
              )}

              {projects.map(project => (
                <div key={project.id} className="project" data-name={project.name}>
                  <div className="page-item" onClick={() => loadProject(state, project, project.pages[0])}>
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <h4 className="text-xs opacity-50">{project.pages.length} pages</h4>
                    </div>
                    <div className="space-x-2 pt-2">
                      <button
                        onClick={e => {
                          duplicate(e, project.id)
                        }}
                        className="page-item-button"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Duplicate"
                      >
                        <AiOutlineCopy />
                      </button>
                      <button
                        onClick={e => {
                          remove(e, project.id)
                        }}
                        className="page-item-button"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Delete"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectsPopup
