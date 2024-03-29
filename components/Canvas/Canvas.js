import { hover } from '@/utils/editor/hover'
import { buildGoogleFonts } from '@/utils/googleFonts/buildGoogleFonts'
import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import TextEditor from '../Editor/TextEditor'
import Element from '../Page/Element'
import Empty from '../Page/Empty'
import HoverBar from '../Page/HoverBar'
import CanvasDisabledOverlay from './CanvasDisabledOverlay'
import CanvasFullscreenButton from './CanvasFullscreenButton'
import CanvasTopBar from './CanvasTopBar'

const CanvasSection = ({ state, section }) => {
  return (
    <div
      className="section"
      id={'marketlify-' + section.id}
      style={{ ...section.style }}
      onClick={e => {
        e.stopPropagation()
        state.active.selectedId.set(section.id)
        state.active.current.set('editing')
      }}
      onMouseOver={e => {
        e.stopPropagation()
        hover(state, 'marketlify-' + section.id, false, 'section')
      }}
    >
      {section.rows.length === 0 && <Empty state={state} type="row" block={section} />}
      {section.rows?.map(row => (
        <CanvasRow state={state} row={row} key={row.id} />
      ))}
    </div>
  )
}

const CanvasRow = ({ state, row }) => {
  return (
    <div
      className="row"
      id={'marketlify-' + row.id}
      style={{ ...row.style }}
      onClick={e => {
        e.stopPropagation()
        state.active.selectedId.set(row.id)
        state.active.current.set('editing')
      }}
      onMouseOver={e => {
        e.stopPropagation()
        hover(state, 'marketlify-' + row.id, false, 'row')
      }}
    >
      {row.columns?.map(column => (
        <CanvasColumn state={state} column={column} key={column.id} />
      ))}
    </div>
  )
}

const CanvasColumn = ({ state, column }) => {
  return (
    <div className="column" style={{ ...column.style }} id={'marketlify-' + column.id}>
      {column.elements.length === 0 && <Empty state={state} type="element" block={column} />}

      {column.elements?.map(element => (
        <CanvasElement state={state} element={element} key={element.id} />
      ))}
    </div>
  )
}

const CanvasElement = ({ state, element }) => {
  const quickSave = () => {
    const page = JSON.stringify(cloneDeep(state.page.get()))
    localStorage.setItem(`marketlify_v4_page_${state.page.id.get()}`, page)
  }

  return (
    <div
      className={`element ${element.type === 'divider' ? 'dividerFix' : ''}`}
      id={'marketlify-' + element.id}
      onClick={e => {
        e.stopPropagation()
        if (element.type === 'headline' || element.type === 'subheadline' || element.type === 'paragraph') {
          state.active.editingTextId.set(element.id)
        } else {
          state.active.editingTextId.set(null)
          state.active.selectedId.set(element.id)
          state.active.current.set('editing')
        }
      }}
      onMouseOver={e => {
        e.stopPropagation()
        hover(state, 'marketlify-' + element.id, false, 'element')
      }}
    >
      {state.active.editingTextId.get() === element.id && (
        <TextEditor
          element={element}
          state={state}
          style={{ ...element.style }}
          updateContent={value => {
            const allContents = state.page.data.content.get()
            allContents.forEach((content, index) => {
              if (content.id === parseInt(element.id)) {
                state.page.data.content[index].content.set(value)
                quickSave()
              }
            })
          }}
          closeEditor={() => {
            setTimeout(() => {
              state.active.editingTextId.set(null)
            }, 50)
          }}
          edit={() => {
            state.active.selectedId.set(element.id)
            state.active.current.set('editing')
            setTimeout(() => {
              state.active.editingTextId.set(null)
            }, 50)
          }}
          updateStyle={style => {
            element.style.set(cloneDeep(style))

            // console.log(element, 'currentContent')
            // console.log(cloneDeep(state.page.data.get()), 'hi o')

            // // console.log(style, element.style, 'dd')
            // // element.style.set(style)
            // state.page.data.set(cloneDeep(state.page.data.get()))
          }}
        />
      )}
      {state.active.editingTextId.get() && state.active.editingTextId.get() !== element.id && (
        <Element element={element} state={state} style={{ ...element.style }} />
      )}

      {!state.active.editingTextId.get() && (
        <Element element={element} state={state} style={{ ...element.style }} />
      )}
    </div>
  )
}

export default function Canvas({ state }) {
  useEffect(() => {
    buildGoogleFonts(state.page.data.get())
  }, [])

  return (
    <main id="canvasContainer" className={`${state.active.fullscreen.get() ? 'fullscreen' : ''} w-full`}>
      <CanvasFullscreenButton state={state} />

      <div id="mainCanvas" className={state.active.viewport.get()}>
        <CanvasTopBar state={state} />

        <div
          id="canvasWrapper"
          onMouseLeave={e => {
            e.stopPropagation()
            state.active.hovering.set(false)
          }}
          style={{ ...state.page.data.styles.body.get() }}
        >
          <CanvasDisabledOverlay state={state} />

          {state.active.hovering.get() && !state.active.editingTextId.get() && <HoverBar state={state} />}
          {state.page.data.styles.sections.get().length == 0 && <Empty state={state} type="section" />}

          {state.page.data.styles.sections.get()?.map((section, sectionIndex) => (
            <CanvasSection state={state} section={section} key={sectionIndex} />
          ))}
        </div>
      </div>
    </main>
  )
}
