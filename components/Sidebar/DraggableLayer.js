import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import findContentById from '@/utils/findContentById'
import { MdOutlineDragIndicator } from 'react-icons/md'

const layerTypes = {
  section: 'section',
  row: 'row',
  column: 'column',
  element: 'element',
}

export default function DraggableLayer({
  id,
  index,
  type,
  moveLayer,
  children,
  sectionId,
  rowId,
  columnId,
  content,
}) {
  const ref = useRef(null)
  const layer = { id, index, type, sectionId, rowId, columnId }

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
    <div ref={ref} style={{ opacity }} className="cursor-move">
      <div
        className={`${type === 'section' ? 'ml-4' : ''} ${type === 'row' ? 'ml-6' : ''} ${
          type === 'column' ? 'ml-8' : ''
        } ${type === 'element' ? 'ml-10' : ''}`}
      >
        <div
          className={`absolute top-4 left-0 w-full border  h-3 rounded shadow-sm z-0 ${
            type === 'section' ? 'bg-green-50  border-green-200' : ''
          } ${type === 'row' ? 'bg-blue-50  border-blue-200' : ''}  ${
            type === 'element' ? 'bg-orange-50 border-orange-200' : ''
          }
          ${type !== 'element' && type !== 'row' ? 'bg-slate-50 border-slate-200' : ''}
          `}
        ></div>
        <div
          className={`bg-slate-50 border p-2 mb-2 border-slate-300 rounded shadow-sm w-full flex justify-between items-center z-10 relative`}
        >
          <span className="font-medium text-sm">{`${findContentById(id, content)?.type || type}`}</span>
          <span className="text-sm font-bold text-slate-400">
            <MdOutlineDragIndicator />
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}
