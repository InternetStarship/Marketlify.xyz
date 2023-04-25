/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import findContentById from '@/utils/findContentById'
import { useState } from 'react'

export default function Elements({ element, data, style }) {
  const [elementData, setElementData] = useState(findContentById(element.id, data.data.content))

  return (
    <>
      {elementData.type === 'headline' && (
        <h1 style={style} dangerouslySetInnerHTML={{ __html: elementData.content }}></h1>
      )}
      {elementData.type === 'subheadline' && (
        <h2 style={style} dangerouslySetInnerHTML={{ __html: elementData.content }}></h2>
      )}
      {elementData.type === 'paragraph' && (
        <p style={style} dangerouslySetInnerHTML={{ __html: elementData.content }}></p>
      )}
      {elementData.type === 'button' && (
        <a href={element.properties.url} target={element.properties.target} style={style}>
          {elementData.content}
        </a>
      )}
      {elementData.type === 'list' && <li style={style}>{elementData.content}</li>}
      {elementData.type === 'image' && (
        <img style={style} src={element.properties.src} alt={element.properties.alt} />
      )}
    </>
  )
}
