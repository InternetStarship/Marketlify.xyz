import { shouldAppendPX } from '@/utils/utility/shouldAppendPX'
import { moveCaretBack } from '@/utils/utility/moveCaretBack'
import { processCSSProperty } from '@/utils/css/processCSSProperty'

export function handleStyleChange(event, styles, setStyles, handleSave) {
  const { name, value } = event.target
  const newStyles = { ...styles, [name]: processCSSProperty({ name, value }) }

  // if (shouldAppendPX({ name, value })) {
  //   setTimeout(() => {
  //     moveCaretBack(2)
  //   }, 0)
  // }

  setStyles(newStyles)
  handleSave(newStyles)
}
