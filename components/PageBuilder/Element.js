/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import findContentById from '@/utils/findContentById'
import { useState } from 'react'

export default function Elements({ element, data }) {
  const [elementData, setElementData] = useState(findContentById(element.id, data.content))

  return (
    <>
      {elementData.type === 'headline' && <h1>{elementData.content}</h1>}
      {elementData.type === 'sub-headline' && <h2>{elementData.content}</h2>}
      {elementData.type === 'paragraph' && <p>{elementData.content}</p>}
      {elementData.type === 'button' && <button>{elementData.content}</button>}
      {elementData.type === 'list' && (
        <ul>
          <li>{elementData.content}</li>
        </ul>
      )}
      {elementData.type === 'image' && <img src={elementData.src} />}
    </>
  )
}
