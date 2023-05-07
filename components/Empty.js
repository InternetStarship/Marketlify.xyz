import { hover } from '@/utils/hover'

export default function Empty({ state, type, block = null }) {
  return (
    <div className="p-4">
      <div
        className="element"
        id={block ? 'marketlify-empty-' + block?.id : 'marketlify-empty-000'}
        onMouseOver={e => {
          e.stopPropagation()
          let domId = block ? 'marketlify-empty-' + block?.id : 'marketlify-empty-000'
          hover(state, domId, true, type)
        }}
      >
        <div className="border border-slate-200 text-sm p-2.5 shadow-sm bg-slate-50 hover:bg-slate-100 text-center uppercase font-medium">
          {type === 'section' && 'Add Section'}
          {type === 'row' && 'Add Row'}
          {type === 'element' && 'Add Element'}
        </div>
      </div>
    </div>
  )
}
