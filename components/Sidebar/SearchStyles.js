/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useState, useEffect } from 'react'

export default function SearchStyles({ onChange }) {
  const [items, setItems] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/css-properties')
        if (!response.ok) {
          console.error('Failed to fetch data')
        }
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

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
