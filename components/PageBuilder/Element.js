/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import findContentById from '@/utils/findContentById'
import { useState } from 'react'

export default function Elements({ element, data }) {
  const [elementData, setElementData] = useState(findContentById(element.id, data.content))

  return <>{elementData.type === 'headline' ? <p>{elementData.content}</p> : <p>Unknown Element Type</p>}</>
}
