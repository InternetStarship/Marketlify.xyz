import { shouldAppendPX } from '@/utils/shouldAppendPX'
import { moveCaretBack } from '@/utils/moveCaretBack'
import { processCSSProperty } from '@/utils/processCSSProperty'

export function handleStyleChange(event, styles, setStyles, handleSave) {
  const { name, value } = event.target
  const newStyles = { ...styles, [name]: processCSSProperty({ name, value }) }

  if (shouldAppendPX({ name, value })) {
    setTimeout(() => {
      moveCaretBack(2)
    }, 0)
  }

  setStyles(newStyles)
  handleSave(newStyles)
}
