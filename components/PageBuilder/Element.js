/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import findContentById from '@/utils/findContentById'
import { useState } from 'react'

export default function Elements({ element, data, style }) {
  const [elementData, setElementData] = useState(findContentById(element.id, data.content))

  return (
    <>
      {elementData.type === 'headline' && <h1 style={style}>{elementData.content}</h1>}
      {elementData.type === 'subheadline' && <h2 style={style}>{elementData.content}</h2>}
      {elementData.type === 'paragraph' && <p style={style}>{elementData.content}</p>}
      {elementData.type === 'button' && <button style={style}>{elementData.content}</button>}
      {elementData.type === 'list' && <li style={style}>{elementData.content}</li>}
      {elementData.type === 'image' && <img style={style} src={elementData.src} />}
    </>
  )
}
