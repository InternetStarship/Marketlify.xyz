import NoPage from '@/components/Page/NoPage'
import NoProject from '@/components/Project/NoProject'
import Canvas from '@/components/Canvas/Canvas'

export function RenderCanvas({ state }) {
  if (!state.project.pages.get()) {
    return <NoProject state={state} />
  }

  if (state.project.pages.get() && !state.page.data.get()?.seo) {
    return <NoPage state={state} />
  }

  if (state.project.pages.get() && state.page.data.get()?.seo) {
    return <Canvas state={state} />
  }

  return null
}
