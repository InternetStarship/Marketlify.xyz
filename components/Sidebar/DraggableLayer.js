import React, { useRef } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useDrag, useDrop } from 'react-dnd'

const layerTypes = {
  section: 'section',
  row: 'row',
  column: 'column',
  element: 'element',
}

export default function DraggableLayer({ layer, index, type, moveLayer }) {
  const ref = useRef(null)

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

      moveLayer(dragIndex, hoverIndex, type)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: layerTypes[type],
    item: { type: layerTypes[type], id: layer.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  const renderChildren = () => {
    switch (type) {
      case 'section':
        return layer.rows.map((row, index) => (
          <DraggableLayer key={row.id} index={index} layer={row} type="row" moveLayer={moveLayer} />
        ))
      case 'row':
        return layer.columns.map((column, index) => (
          <DraggableLayer key={column.id} index={index} layer={column} type="column" moveLayer={moveLayer} />
        ))
      case 'column':
        return layer.elements.map((element, index) => (
          <DraggableLayer
            key={element.id}
            index={index}
            layer={element}
            type="element"
            moveLayer={moveLayer}
          />
        ))
      default:
        return null
    }
  }

  return (
    <div ref={ref} style={{ opacity }}>
      <div
        className={`bg-slate-200 border p-2 mb-2 border-slate-400 w-full flex justify-between items-center pl-${
          type === 'row' ? 4 : 2
        }`}
      >
        <span>{`${type}`}</span>
        <span className="text-xs text-slate-500">{`#${layer.id}`}</span>
      </div>
      {renderChildren()}
    </div>
  )
}
