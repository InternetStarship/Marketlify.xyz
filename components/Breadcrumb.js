import { buildBreadcrumb } from '@/utils/buildBreadcrumb'

export default function NoPages({ page, selectedId, edit }) {
  return (
    <div
      className="fixed bottom-0 left-0 flex space-x-4 bg-white rounded-tr-md py-3 px-4"
      style={{ left: 340, zIndex: 999999 }}
    >
      {buildBreadcrumb(selectedId, page, edit)}
    </div>
  )
}
