import { findById } from '../utility/findById'
import { findTypeById } from '../utility/findTypeById'
import { getIndexesById } from '../utility/getIndexesById'
import { generateUniqueId } from '../utility/generateUniqueId'
import { cloneDeep } from 'lodash'

const duplicatedIds = new Set()

function duplicateContent(newItem, state) {
  const previousContent = cloneDeep(
    state.page.data.content.get().find(content => content.id === state.active.selectedId.get())
  )
  if (previousContent) {
    state.page.data.content.merge([
      {
        ...previousContent,
        id: newItem.id,
      },
    ])
  }
}

function duplicateInnerContent(state) {
  duplicatedIds.forEach(content => {
    const id = content.newId
    state.page.data.content.merge([
      {
        ...content,
        id: id,
      },
    ])
  })
}

function updateNestedIds(item, state) {
  if (item.hasOwnProperty('id')) {
    const newId = generateUniqueId(state.active.existingIds.get())
    state.active.existingIds.merge([item])

    if (item?.type) {
      const content = state.page.data.content.get().find(content => content.id === item.id)
      if (content)
        duplicatedIds.add({
          ...content,
          newId: newId,
        })
    }

    item.id = newId
  }

  if (item.hasOwnProperty('rows')) {
    item.rows.forEach(row => updateNestedIds(row, state))
  }

  if (item.hasOwnProperty('columns')) {
    item.columns.forEach(column => updateNestedIds(column, state))
  }

  if (item.hasOwnProperty('elements')) {
    item.elements.forEach(element => {
      updateNestedIds(element, state)
    })
  }
}

export function duplicate(state) {
  const element = findById(state.active.selectedId.get(), state.page.data.get().styles.sections)
  const type = findTypeById(state.active.selectedId.get(), state.page.data.get().styles.sections)
  const currentElement = getIndexesById(state.active.selectedId.get(), state.page.data.get().styles.sections)

  let newItem
  const newId = generateUniqueId(state.active.existingIds.get())
  state.active.existingIds.merge([newId])

  switch (type) {
    case 'section':
      newItem = { ...element, id: newId }
      updateNestedIds(newItem, state)
      state.page.data.styles.sections.set(items => {
        items.splice(currentElement.sectionIndex, 0, newItem)
        return items
      })
      break

    case 'row':
      newItem = { ...element, id: newId }
      updateNestedIds(newItem, state)
      state.page.data.styles.sections[currentElement.sectionIndex].rows.set(items => {
        items.splice(currentElement.rowIndex, 0, newItem)
        return items
      })
      break

    case 'column':
      newItem = { ...element, id: newId }
      updateNestedIds(newItem, state)
      state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns.set(
        items => {
          items.splice(currentElement.columnIndex, 0, newItem)
          return items
        }
      )
      break

    case 'element':
      newItem = { ...element, id: newId }
      state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].elements.set(items => {
        items.splice(currentElement.elementIndex, 0, newItem)
        return items
      })

      duplicateContent(newItem, state)
      break
  }

  duplicateInnerContent(state)

  const page = JSON.stringify(cloneDeep(state.page.get()))
  localStorage.setItem(`marketlify_v4_page_${state.page.id.get()}`, page)

  state.active.selectedId.set('')
  state.active.current.set('')
  state.active.hovering.set(false)
}
