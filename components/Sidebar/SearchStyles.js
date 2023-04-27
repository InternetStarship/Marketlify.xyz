import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useState } from 'react'
import { FaCode } from 'react-icons/fa'
import { camelCaseToTitleCase } from '@/utils/camelCaseToTitleCase'

export default function SearchStyles({ onChange, items, showCSS, setShowCSS }) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="relative w-full flex items-center space-x-2">
      <div
        className={`relative w-full ${showCSS ? 'pointer-events-none opacity-30 cursor-not-allowed' : ''}`}
      >
        <ReactSearchAutocomplete
          items={items}
          onSelect={item => {
            onChange(item.name)
            setSearchValue('')
          }}
          autoFocus
          formatResult={item => {
            return <span>{camelCaseToTitleCase(item.name)}</span>
          }}
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
