export function moveCaretBack(amount = 2) {
  const activeElement = document.activeElement

  if (activeElement.tagName.toLowerCase() === 'input') {
    const currentPosition = activeElement.selectionStart
    const newPosition = Math.max(0, currentPosition - amount)
    activeElement.setSelectionRange(newPosition, newPosition)
  }
}
