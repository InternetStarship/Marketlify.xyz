import WelcomePopup from '@/components/Popup/WelcomePopup'
import ExportPopup from '@/components/Popup/ExportPopup'
import NewProjectPopup from '@/components/Popup/NewProjectPopup'
import ProjectsPopup from '@/components/Popup/ProjectsPopup'

export function RenderPopups({ state }) {
  return (
    <>
      <WelcomePopup state={state} />
      {state.popup.type.get() === 'new-project' && <NewProjectPopup state={state} />}
      {state.popup.type.get() === 'projects' && <ProjectsPopup state={state} />}
      {state.popup.type.get() === 'export' && <ExportPopup state={state} />}
    </>
  )
}
