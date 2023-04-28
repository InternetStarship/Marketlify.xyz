import { IoText, IoImageOutline } from 'react-icons/io5'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { RxButton } from 'react-icons/rx'
import { TbColumns1, TbColumns2, TbColumns3, TbColumnInsertLeft, TbContainer } from 'react-icons/tb'

import { addRow } from '@/utils/addRow'
import { addSection } from '@/utils/addSection'
import { addElement } from '@/utils/addElement'

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
            {hoverType === 'section' && (
              <>
                <div
                  onClick={() => {
                    addSection(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      '1650px',
                      existingIds,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbContainer />
                  <span>Full</span>
                </div>
                <div
                  onClick={() => {
                    addSection(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      '1280px',
                      existingIds,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbContainer />
                  <span>Extra Large</span>
                </div>
                <div
                  onClick={() => {
                    addSection(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      '1080px',
                      existingIds,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbContainer />
                  <span>Large</span>
                </div>
                <div
                  onClick={() => {
                    addSection(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      '960px',
                      existingIds,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbContainer />
                  <span>Medium</span>
                </div>
                <div
                  onClick={() => {
                    addSection(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      '760px',
                      existingIds,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbContainer />
                  <span>Small</span>
                </div>
                <div
                  onClick={() => {
                    addSection(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      '480px',
                      existingIds,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbContainer />
                  <span>Extra Small</span>
                </div>
              </>
            )}
            {hoverType === 'row' && (
              <>
                <div
                  onClick={() => {
                    addRow(
                      () => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      1,
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbColumns1 />
                  <span>1 Column</span>
                </div>
                <div
                  onClick={() => {
                    addRow(
                      () => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      2,
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbColumns2 />
                  <span>2 Columns</span>
                </div>
                <div
                  onClick={() => {
                    addRow(
                      () => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      3,
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbColumns3 />
                  <span>3 Columns</span>
                </div>
                <div
                  onClick={() => {
                    addRow(
                      () => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      4,
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbColumnInsertLeft />
                  <span>4 Columns</span>
                </div>
                <div
                  onClick={() => {
                    addRow(
                      () => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      5,
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbColumnInsertLeft />
                  <span>5 Columns</span>
                </div>
                <div
                  onClick={() => {
                    addRow(
                      () => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      6,
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <TbColumnInsertLeft />
                  <span>6 Columns</span>
                </div>
              </>
            )}

            {hoverType === 'column' && (
              <>
                <div className="block">
                  <TbColumnInsertLeft />
                  <span>Add 1 Column</span>
                </div>
              </>
            )}

            {hoverType === 'element' && (
              <>
                <div
                  onClick={() => {
                    addElement(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      'headline',
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <IoText />
                  <span>Headline</span>
                </div>
                <div
                  onClick={() => {
                    addElement(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      'subheadline',
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <IoText />
                  <span>Sub Headline</span>
                </div>
                <div
                  onClick={() => {
                    addElement(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      'paragraph',
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <IoText />
                  <span>Paragraph</span>
                </div>
                <div
                  onClick={() => {
                    addElement(
                      page => {
                        setPopup(false)
                        updatePage(page)
                        updateHovering(false)
                      },
                      'icon',
                      existingIds,
                      selectedId,
                      page
                    )
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Icon</span>
                </div>
                <div
                  onClick={() => {
                    addElement('list')
                  }}
                  className="block"
                >
                  <AiOutlineUnorderedList />
                  <span>List</span>
                </div>
                <div
                  onClick={() => {
                    addElement('divider')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Divider</span>
                </div>
                <div
                  onClick={() => {
                    addElement('image')
                  }}
                  className="block"
                >
                  <IoImageOutline />
                  <span>Image</span>
                </div>

                <div
                  onClick={() => {
                    addElement('video')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Video</span>
                </div>

                <div
                  onClick={() => {
                    addElement('button')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Button</span>
                </div>

                <div
                  onClick={() => {
                    addElement('container')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Container</span>
                </div>

                <div
                  onClick={() => {
                    addElement('table')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Table</span>
                </div>

                <div
                  onClick={() => {
                    addElement('custom-html')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Custom HTML</span>
                </div>

                <div
                  onClick={() => {
                    addElement('label')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Label</span>
                </div>
                <div
                  onClick={() => {
                    addElement('input')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Input</span>
                </div>
                <div
                  onClick={() => {
                    addElement('textarea')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Textarea</span>
                </div>
                <div
                  onClick={() => {
                    addElement('select')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Select</span>
                </div>
                <div
                  onClick={() => {
                    addElement('checkbox')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Checkbox</span>
                </div>
                <div
                  onClick={() => {
                    addElement('radio')
                  }}
                  className="block"
                >
                  <RxButton />
                  <span>Radio</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
