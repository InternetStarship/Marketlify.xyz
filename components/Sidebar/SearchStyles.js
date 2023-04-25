/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useState, useEffect } from 'react'

export default function SearchStyles({ onChange, items }) {
  const [searchValue, setSearchValue] = useState('')

  const handleOnSelect = item => {
    onChange(item.name)
    setSearchValue('')
  }

  const formatResult = item => {
    return <span>{camelCaseToTitleCase(item.name)}</span>
  }

  function camelCaseToTitleCase(camelCaseStr) {
    let titleCaseStr = camelCaseStr.replace(/([A-Z])/g, ' $1').toLowerCase()
    titleCaseStr = titleCaseStr.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())

    return titleCaseStr
  }

  return (
    <div className="relative w-full">
      <ReactSearchAutocomplete
        items={items}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
        className="styleSearch"
        placeholder="Search 280+ CSS styles..."
        inputSearchString={searchValue}
      />
    </div>
  )
}
