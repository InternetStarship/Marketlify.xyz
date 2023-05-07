import { findTypeById } from '@/utils/utility/findTypeById'

export function hover(state, elementId, isEmpty = false, type = '') {
  let element = document.getElementById(elementId)
  let positions = {}
  let id = ''

  if (type === '') {
    type = findTypeById(parseInt(elementId.replace('marketlify-', '')), state.page.data.get().styles.sections)
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

    if (width < 180) {
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
    state.active.selectedId.set(id)
  }

  if (element) {
    state.active.hoverType.set(type)
    state.active.hovering.set(true)
  }
  if (positions) {
    state.active.position.set(positions)
  }
}
