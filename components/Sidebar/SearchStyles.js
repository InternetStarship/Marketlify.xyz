import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useState } from 'react'
import { FaCode } from 'react-icons/fa'

export default function SearchStyles({ onChange, items, showCSS, setShowCSS }) {
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
    <div className="relative w-full flex items-center space-x-2">
      <div
        className={`relative w-full ${showCSS ? 'pointer-events-none opacity-30 cursor-not-allowed' : ''}`}
      >
        <ReactSearchAutocomplete
          items={items}
          onSelect={handleOnSelect}
          autoFocus
          formatResult={formatResult}
          className="styleSearch"
          placeholder="Search to add style..."
          inputSearchString={searchValue}
        />
      </div>
      <div
        onClick={() => {
          setShowCSS(!showCSS)
        }}
        className={`text-xl p-3 pl-3 cursor-pointer ${
          showCSS ? 'text-orange-700 rounded bg-orange-200' : ''
        }`}
        data-tooltip-id="tooltip"
        data-tooltip-content="Toggle CSS"
      >
        <FaCode />
      </div>
    </div>
  )
}
