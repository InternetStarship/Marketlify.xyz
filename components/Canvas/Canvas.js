import { useEffect } from 'react'
import CanvasFullscreenButton from './CanvasFullscreenButton'
import CanvasTopBar from './CanvasTopBar'
import CanvasDisabledOverlay from './CanvasDisabledOverlay'
import { buildGoogleFonts } from '@/utils/googleFonts/buildGoogleFonts'
import { hover } from '@/utils/editor/hover'
import TextEditor from '../Editor/TextEditor'
import Element from '../Page/Element'
import Empty from '../Page/Empty'
import HoverBar from '../Page/HoverBar'

const CanvasSection = ({ state, section, sectionIndex }) => {
  return (
    <div
      className="section"
      id={'marketlify-' + section.id}
      key={section.id}
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
      {section.rows?.map((row, rowIndex) => (
        <CanvasRow state={state} row={row} rowIndex={rowIndex} sectionIndex={sectionIndex} />
      ))}
    </div>
  )
}

const CanvasRow = ({ state, row, rowIndex, sectionIndex }) => {
  return (
    <div
      className="row"
      id={'marketlify-' + row.id}
      key={`${sectionIndex}-${rowIndex}`}
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
      {row.columns?.map((column, colIndex) => (
        <CanvasColumn
          state={state}
          column={column}
          colIndex={colIndex}
          rowIndex={rowIndex}
          sectionIndex={sectionIndex}
        />
      ))}
    </div>
  )
}

const CanvasColumn = ({ state, column, colIndex, rowIndex, sectionIndex }) => {
  return (
    <div
      key={`${sectionIndex}-${rowIndex}-${colIndex}`}
      className="column"
      style={{ ...column.style }}
      id={'marketlify-' + column.id}
    >
      {column.elements.length === 0 && <Empty state={state} type="element" block={column} />}

      {column.elements?.map((element, elementIndex) => (
        <CanvasElement
          state={state}
          element={element}
          elementIndex={elementIndex}
          colIndex={colIndex}
          rowIndex={rowIndex}
          sectionIndex={sectionIndex}
        />
      ))}
    </div>
  )
}

const CanvasElement = ({ state, element }) => {
  return (
    <div
      className={`element ${element.type === 'divider' ? 'dividerFix' : ''}`}
      id={'marketlify-' + element.id}
      key={element.id}
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
          data={data}
          style={{ ...element.style }}
          updateContent={value => {
            data.content.filter(content => content.id === element.id)[0].content = value
            state.page.data.set(data)
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
            element.style = style
            state.page.data.set(data)
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
            <CanvasSection state={state} section={section} sectionIndex={sectionIndex} />
          ))}
        </div>
      </div>
    </main>
  )
}
