import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const layerTypes = {
  section: 'section',
  row: 'row',
  column: 'column',
  element: 'element',
}

export default function DraggableLayer({ id, index, type, moveLayer, children, sectionId, rowId }) {
  const ref = useRef(null)
  const layer = { id, index, type, sectionId, rowId }

  const [, drop] = useDrop({
    accept: layerTypes[type],
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveLayer(item, layer, dragIndex, hoverIndex, type)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: layerTypes[type],
    item: { ...layer },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity }}>
      <div
        className={`bg-slate-200 border p-2 mb-2 border-slate-400 w-full flex justify-between items-center pl-${
          type === 'row' ? 4 : 2
        }`}
      >
        <span>{`${type}`}</span>
        <span className="text-xs text-slate-500">{`#${id}`}</span>
      </div>
      {children}
    </div>
  )
}
