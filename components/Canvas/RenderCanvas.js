import NoPage from '@/components/Page/NoPage'
import NoFunnel from '@/components/Funnel/NoFunnel'
import Canvas from '@/components/Canvas/Canvas'

export function RenderCanvas({ state }) {
  if (!state.funnel.pages.get()) {
    return <NoFunnel state={state} />
  }

  if (state.funnel.pages.get() && !state.page.data.get()?.seo) {
    return <NoPage state={state} />
  }

  if (state.funnel.pages.get() && state.page.data.get()?.seo) {
    return <Canvas state={state} />
  }

  return null
}
