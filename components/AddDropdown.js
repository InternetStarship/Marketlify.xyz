import { IoText, IoImageOutline } from 'react-icons/io5'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { RxButton } from 'react-icons/rx'
import { TbColumns1, TbColumns2, TbColumns3, TbColumnInsertLeft, TbContainer } from 'react-icons/tb'
import { addRow } from '@/utils/addRow'
import { addSection } from '@/utils/addSection'
import { addElement } from '@/utils/addElement'

const hoverTypeConfig = {
  section: [
    { width: '1650px', label: 'Full', Icon: TbContainer },
    { width: '1280px', label: 'Extra Large', Icon: TbContainer },
    { width: '1080px', label: 'Large', Icon: TbContainer },
    { width: '960px', label: 'Medium', Icon: TbContainer },
    { width: '760px', label: 'Small', Icon: TbContainer },
    { width: '480px', label: 'Extra Small', Icon: TbContainer },
  ],
  row: [
    { columns: 1, label: '1 Column', Icon: TbColumns1 },
    { columns: 2, label: '2 Columns', Icon: TbColumns2 },
    { columns: 3, label: '3 Columns', Icon: TbColumns3 },
    { columns: 4, label: '4 Columns', Icon: TbColumnInsertLeft },
    { columns: 5, label: '5 Columns', Icon: TbColumnInsertLeft },
    { columns: 6, label: '6 Columns', Icon: TbColumnInsertLeft },
    { columns: 7, label: '7 Columns', Icon: TbColumnInsertLeft },
    { columns: 8, label: '8 Columns', Icon: TbColumnInsertLeft },
    { columns: 9, label: '9 Columns', Icon: TbColumnInsertLeft },
  ],
  element: [
    { type: 'headline', label: 'Headline', Icon: IoText },
    { type: 'subheadline', label: 'Sub Headline', Icon: IoText },
    { type: 'paragraph', label: 'Paragraph', Icon: IoText },
    { type: 'icon', label: 'Icon', Icon: RxButton },
    { type: 'list', label: 'List', Icon: AiOutlineUnorderedList },
    { type: 'image', label: 'Image', Icon: IoImageOutline },
    { type: 'video', label: 'Video', Icon: IoImageOutline },
    { type: 'divider', label: 'Divider', Icon: IoImageOutline },
    { type: 'button', label: 'Button', Icon: RxButton },
    { type: 'label', label: 'Label', Icon: IoImageOutline },
    { type: 'input', label: 'Input', Icon: IoImageOutline },
    { type: 'textarea', label: 'Textarea', Icon: IoImageOutline },
    { type: 'select', label: 'Select', Icon: IoImageOutline },
    { type: 'checkbox', label: 'Checkbox', Icon: IoImageOutline },
    { type: 'radio', label: 'Radio', Icon: IoImageOutline },
    { type: 'custom-html', label: 'Custom HTML', Icon: IoImageOutline },
  ],
}

function generateBlocks(config, onClick, existingIds, page, selectedId) {
  return config.map(({ Icon, label, ...rest }) => (
    <div
      key={label}
      onClick={() => {
        onClick(rest, existingIds, page, selectedId)
      }}
      className="block"
    >
      <Icon />
      <span>{label}</span>
    </div>
  ))
}

export default function AddDropdown({
  children,
  existingIds,
  hoverType,
  popup,
  selectedId,
  page,
  updatePage,
  setPopup,
  id,
  updateHovering,
}) {
  const onClickHandlers = {
    section: ({ width }) =>
      addSection(
        page => {
          setPopup(false)
          updatePage(page)
          updateHovering(false)
        },
        width,
        existingIds,
        page
      ),
    row: ({ columns }) =>
      addRow(
        () => {
          setPopup(false)
          updatePage(page)
          updateHovering(false)
        },
        columns,
        existingIds,
        selectedId,
        page
      ),
    element: ({ type }) =>
      addElement(
        page => {
          setPopup(false)
          updatePage(page)
          updateHovering(false)
        },
        type,
        existingIds,
        selectedId,
        page
      ),
  }

  return (
    <div
      className="relative"
      id={id}
      onClick={() => {
        setPopup(true)
      }}
    >
      {children}

      {popup && (
        <div className="blocks-coyote-time">
          <div className={`blocks-popup ${hoverType}Theme`}>
            {generateBlocks(
              hoverTypeConfig[hoverType],
              onClickHandlers[hoverType],
              existingIds,
              page,
              selectedId
            )}
          </div>
        </div>
      )}
    </div>
  )
}
