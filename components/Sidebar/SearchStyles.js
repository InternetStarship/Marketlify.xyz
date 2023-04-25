/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useState, useEffect } from 'react'

export default function SearchStyles({ onChange, items }) {
  const [searchValue, setSearchValue] = useState('')

  const handleOnSearch = (string, results) => {}
  const handleOnFocus = () => {}
  const handleOnHover = result => {}

  const handleOnSelect = item => {
    onChange(item.name)
    setSearchValue('')
  }

  const formatResult = item => {
    return <span>{item.name}</span>
  }
  return (
    <div className="relative w-full">
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        className="styleSearch"
        placeholder="Search for a CSS style"
        inputSearchString={searchValue}
      />
    </div>
  )
}
