import { findTypeById } from '@/utils/findTypeById'

export function hover(callback, elementId, isEmpty = false, type = '', sections = []) {
  let element = document.getElementById(elementId)
  let positions = {}
  let id = ''

  if (type === '') {
    type = findTypeById(parseInt(elementId.replace('marketlify-', '')), sections)
  }

  if (element) {
    positions = {
      top: `${element.offsetTop}px`,
      left: `${element.offsetLeft}px`,
      width: `${element.offsetWidth}px`,
      height: `${element.offsetHeight}px`,
    }

    const elementRect = element.getBoundingClientRect()
    const width = elementRect.width

    if (width < 280) {
      document.querySelectorAll('.hoverSmallHidden').forEach(element => {
        element.style.display = 'none'
      })
    } else {
      document.querySelectorAll('.hoverSmallHidden').forEach(element => {
        element.style.display = 'flex'
      })
    }

    if (document.querySelector('.hoverBarRight')) {
      if (isEmpty) {
        document.querySelector('.hoverBarRight').style.display = 'none'
        document.querySelector('.hoverBarLeft').style.display = 'none'
      } else {
        document.querySelector('.hoverBarRight').style.display = 'flex'
        document.querySelector('.hoverBarLeft').style.display = 'flex'
      }
    }

    if (isEmpty) {
      const selected_id = parseInt(element.id.replace('marketlify-empty-', ''))
      id = selected_id
    } else {
      id = parseInt(elementId.replace('marketlify-', ''))
    }
  }

  return callback({
    element,
    positions,
    id,
    type,
  })
}
