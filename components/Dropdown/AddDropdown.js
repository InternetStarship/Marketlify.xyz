import { IoText, IoImageOutline } from 'react-icons/io5'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { RxButton, RxDividerHorizontal, RxCheckbox, RxRadiobutton, RxInput, RxCode } from 'react-icons/rx'
import { TbSelect, TbColumns1, TbColumns2, TbColumns3, TbColumnInsertLeft, TbContainer } from 'react-icons/tb'
import { MdOutlineOndemandVideo, MdLabelOutline } from 'react-icons/md'
import { BsTextareaResize } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'

import { addRow } from '@/utils/dom/addRow'
import { addSection } from '@/utils/dom/addSection'
import { addElement } from '@/utils/dom/addElement'

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
    { type: 'video', label: 'Video', Icon: MdOutlineOndemandVideo },
    { type: 'divider', label: 'Divider', Icon: RxDividerHorizontal },
    { type: 'button', label: 'Button', Icon: RxButton },
    { type: 'label', label: 'Label', Icon: MdLabelOutline },
    { type: 'input', label: 'Input', Icon: RxInput },
    { type: 'textarea', label: 'Textarea', Icon: BsTextareaResize },
    { type: 'select', label: 'Select', Icon: TbSelect },
    { type: 'checkbox', label: 'Checkbox', Icon: RxCheckbox },
    { type: 'radio', label: 'Radio', Icon: RxRadiobutton },
    { type: 'customHTML', label: 'Custom HTML', Icon: RxCode },
  ],
}

const generateBlocks = (config, onClick, state) => {
  return config.map(({ Icon, label, ...rest }) => (
    <div
      key={label}
      onClick={() => {
        onClick(rest, state.active.existingIds.get(), state.page.data.get(), state.active.selectedId.get())
      }}
      className="block"
    >
      <Icon />
      <span>{label}</span>
    </div>
  ))
}

const isCloseToBottom = (type, selectedId) => {
  const dom = document.querySelector(`#marketlify-${selectedId}`)
  if (dom) {
    let heightOfPopup = 365
    if (type === 'section') {
      heightOfPopup = 300
    } else if (type === 'row') {
      heightOfPopup = 300
    }
    const bottom = dom.getBoundingClientRect().bottom + heightOfPopup
    const windowHeight = window.innerHeight
    return bottom > windowHeight
  }
  return false
}

export default function AddDropdown({ state, popup, setPopup }) {
  const onClickHandlers = {
    section: ({ width }) => addSection(state, width),
    row: ({ columns }) => addRow(state, columns),
    element: ({ type }) => addElement(state, type),
  }

  return (
    <div
      className="relative"
      id="hoverBarBottom"
      onClick={() => {
        setPopup(true)
      }}
    >
      <FaPlus />

      {popup && (
        <div
          className={`blocks-coyote-time ${state.active.hoverType.get()}Theme ${
            isCloseToBottom(state.active.hoverType.get(), state.active.selectedId.get()) ? 'position-top' : ''
          }`}
        >
          <div className={`blocks-popup ${state.active.hoverType.get()}Theme`}>
            {generateBlocks(
              hoverTypeConfig[state.active.hoverType.get()],
              onClickHandlers[state.active.hoverType.get()],
              state
            )}
          </div>
        </div>
      )}
    </div>
  )
}
