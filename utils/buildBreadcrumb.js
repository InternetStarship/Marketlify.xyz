import { getIndexesById } from '@/utils/getIndexesById'
import { TbSection, TbColumns1 } from 'react-icons/tb'
import { AiOutlineInsertRowAbove } from 'react-icons/ai'
import { RxDot } from 'react-icons/rx'

export function buildBreadcrumb(selectedId, page, edit) {
  if (selectedId && page.data) {
    const currentElement = getIndexesById(selectedId, page.data.styles.sections)
    return Object.entries(currentElement)
      .filter(([key, value]) => value !== -1)
      .map(([key, value]) => (
        <span
          key={key}
          className="cursor-pointer flex text-xs uppercase font-medium items-center hover:text-blue-700 hover:underline"
          data-type={key.replace('Index', '')}
          data-index={value}
          onClick={() => {
            const type = key.replace('Index', '')
            switch (type) {
              case 'section':
                edit(page.data.styles.sections[value])
                break
              case 'row':
                edit(page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex])
                break
              case 'column':
                edit(
                  page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex]
                    .columns[currentElement.columnIndex]
                )
                break
              case 'element':
                edit(
                  page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex]
                    .columns[currentElement.columnIndex].elements[currentElement.elementIndex]
                )
                break
            }
          }}
        >
          {key === 'sectionIndex' && <TbSection className="mr-1" />}
          {key === 'rowIndex' && <AiOutlineInsertRowAbove className="mr-1" />}
          {key === 'columnIndex' && <TbColumns1 className="mr-1" />}
          {key === 'elementIndex' && <RxDot className="mr-1" />}
          {key.replace('Index', '')}
        </span>
      ))
  } else {
    return []
  }
}
