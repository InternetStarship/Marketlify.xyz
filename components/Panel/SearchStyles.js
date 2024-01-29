import { useState } from 'react'
import { FaCode } from 'react-icons/fa'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { camelCaseToTitleCase } from '@/utils/utility/camelCaseToTitleCase'

export default function SearchStyles({
  onChange,
  allCSSProperties,
  showCSS,
  setShowCSS,
  setStyles,
  codeBox,
}) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="relative flex w-full items-center space-x-2">
      <div
        className={`relative w-full ${showCSS ? 'pointer-events-none cursor-not-allowed opacity-30' : ''}`}
      >
        <ReactSearchAutocomplete
          items={allCSSProperties}
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
          if (showCSS && codeBox) {
            const cssProps = codeBox
              .match(/{([^}]*)}/)[1]
              .trim()
              .split(';')

            const styleObj = {}
            cssProps.forEach(prop => {
              if (prop.trim() !== '') {
                const [key, value] = prop.split(':').map(item => item.trim())
                const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
                styleObj[camelCaseKey] = value
              }
            })
            setStyles(styleObj)
          }
          setShowCSS(!showCSS)
        }}
        className={`cursor-pointer p-3 pl-3 text-xl ${
          showCSS ? 'rounded bg-orange-200 text-orange-700' : ''
        }`}
        data-tooltip-id="tooltip"
        data-tooltip-content="Toggle CSS"
      >
        <FaCode />
      </div>
    </div>
  )
}
