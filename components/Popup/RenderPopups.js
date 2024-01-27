import WelcomePopup from '@/components/Popup/WelcomePopup'
import ExportPopup from '@/components/Popup/ExportPopup'
import NewProjectPopup from '@/components/Popup/NewProjectPopup'
import ProjectsPopup from '@/components/Popup/ProjectsPopup'

export function RenderPopups({ state }) {
  return (
    <>
      <WelcomePopup state={state} />
      <NewProjectPopup state={state} />
      <ProjectsPopup state={state} />
      <ExportPopup state={state} />
    </>
  )
}
