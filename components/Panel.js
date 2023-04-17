/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { useState, useEffect, Suspense } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import _ from 'lodash'
import findById from '@/utils/findById'
import findTypeById from '@/utils/findTypeById'
import getIndexesById from '@/utils/getIndexesById'
import { ChromePicker } from 'react-color'
import dynamic from 'next/dynamic'
const FontPicker = dynamic(() => import('font-picker-react'), {
  suspense: true,
})
export default function Panel({ page, close, selectedId, updatePage }) {
  const [styles, setStyles] = useState({})
  const [selectedType, setSelectedType] = useState()
  const [selectedStyle, setSelectedStyle] = useState()
  const [cssAttributes, setCssAttributes] = useState([
    'alignContent',
    'alignItems',
    'alignSelf',
    'backgroundColor',
    'backgroundAttachment',
    'backgroundBlendMode',
    'backgroundClip',
    'backgroundColor',
    'backgroundImage',
    'backgroundOrigin',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize',
    'borderBottomColor',
    'borderBottomStyle',
    'borderBottomWidth',
    'borderColor',
    'borderLeftColor',
    'borderLeftStyle',
    'borderLeftWidth',
    'borderRadius',
    'borderRightColor',
    'borderRightStyle',
    'borderRightWidth',
    'borderTopColor',
    'borderTopStyle',
    'borderTopWidth',
    'bottom',
    'boxShadow',
    'boxSizing',
    'clear',
    'color',
    'columnGap',
    'columnRuleColor',
    'columnRuleStyle',
    'columnRuleWidth',
    'columnSpan',
    'columnWidth',
    'display',
    'flex',
    'flexBasis',
    'flexDirection',
    'flexFlow',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'float',
    'fontFamily',
    'fontFeatureSettings',
    'fontKerning',
    'fontSize',
    'fontStretch',
    'fontStyle',
    'fontVariant',
    'fontVariantCaps',
    'fontWeight',
    'gap',
    'grid',
    'gridArea',
    'gridAutoColumns',
    'gridAutoFlow',
    'gridAutoRows',
    'gridColumn',
    'gridColumnEnd',
    'gridColumnGap',
    'gridColumnStart',
    'gridGap',
    'gridRow',
    'gridRowEnd',
    'gridRowGap',
    'gridRowStart',
    'gridTemplate',
    'gridTemplateAreas',
    'gridTemplateColumns',
    'gridTemplateRows',
    'height',
    'justifyContent',
    'justifyItems',
    'justifySelf',
    'left',
    'letterSpacing',
    'lineHeight',
    'listStyleImage',
    'listStylePosition',
    'listStyleType',
    'margin',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'objectFit',
    'objectPosition',
    'opacity',
    'order',
    'outlineColor',
    'outlineOffset',
    'outlineStyle',
    'outlineWidth',
    'overflow',
    'overflowX',
    'overflowY',
    'padding',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'placeContent',
    'placeItems',
    'placeSelf',
    'position',
    'right',
    'rowGap',
    'textDecorationColor',
    'textDecorationLine',
    'textDecorationStyle',
    'textIndent',
    'textShadow',
    'textTransform',
    'top',
    'verticalAlign',
    'visibility',
    'whiteSpace',
    'width',
    'wordBreak',
    'wordSpacing',
    'zIndex',
  ])

  useEffect(() => {
    const currentElement = findById(selectedId, page.sections)
    const type = findTypeById(selectedId, page.sections)
    if (currentElement) {
      setStyles(currentElement.style)
      setSelectedType(type)
    }
  }, [selectedId])

  const handleChange = event => {
    const { name, value } = event.target
    const newStyles = { ...styles, [name]: value }
    setStyles(newStyles)
    handleSave(newStyles)
  }

  const handleColorChange = color => {
    let newStyles = {
      ...styles,
      color: color.hex,
    }
    if (color.rgb.a) {
      newStyles = {
        ...styles,
        color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      }
    }

    setStyles(newStyles)
    handleSave(newStyles)
  }

  const handleFontChange = font => {
    console.log(font)
    // const { name, value } = event.target
    const newStyles = { ...styles, ['fontFamily']: font }
    setStyles(newStyles)
    handleSave(newStyles)
  }

  const handleSave = newStyles => {
    const currentElement = getIndexesById(selectedId, page.sections)
    const type = findTypeById(selectedId, page.sections)

    if (type === 'section') {
      page.sections[currentElement.sectionIndex].style = newStyles
    } else if (type === 'row') {
      page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].style = newStyles
    } else if (type === 'column') {
      page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].style = newStyles
    } else if (type === 'element') {
      page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].elements[currentElement.elementIndex].style = newStyles
    }

    updatePage(_.cloneDeep(page))
  }

  const renderInputs = () => {
    const makeLabelPretty = key => {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    if (styles) {
      return Object.entries(styles).map(([key, value]) => (
        <div key={key} className="sidebar-fieldset">
          <label className="sidebar-label" htmlFor={key}>
            {makeLabelPretty(key)}
            <div
              onClick={() => {
                removeStyle(key)
              }}
            >
              <FaTimes />
            </div>
          </label>

          {/* {(key.includes('color') || key.includes('Color')) && (
            <div className="absolute right-0 top-0" style={{ zIndex: 99999 }}>
              <ChromePicker color={value} onChange={handleColorChange} />
            </div>
          )} */}

          {key === 'fontFamily' && (
            <Suspense fallback={`Loading...`}>
              <FontPicker
                apiKey={process.env.FONTS_API}
                activeFontFamily={'Roboto'}
                onChange={nextFont => {
                  console.log(nextFont)
                  handleFontChange(nextFont.family)
                }}
              />
            </Suspense>
          )}

          {key !== 'fontFamily' && (
            <input
              className="sidebar-input"
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
            />
          )}
        </div>
      ))
    }
  }

  function addStyle(selectedStyle) {
    const newStyles = _.cloneDeep(styles)
    newStyles[selectedStyle] = ''
    setStyles(newStyles)
    handleSave(newStyles)
    setSelectedStyle('')
  }

  function removeStyle(key) {
    const newStyles = _.cloneDeep(styles)
    delete newStyles[key]
    setStyles(newStyles)
    handleSave(newStyles)
  }

  function camelCaseToTitleCase(camelCaseStr) {
    let titleCaseStr = camelCaseStr.replace(/([A-Z])/g, ' $1').toLowerCase()
    titleCaseStr = titleCaseStr.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())

    return titleCaseStr
  }

  return (
    <>
      <div className="text-xl p-3 text-white bg-slate-800 flex items-center justify-between font-bold">
        <h3 className="capitalize">Editing {selectedType}</h3>
        <button onClick={close}>
          <AiOutlineCloseCircle />
        </button>
      </div>
      <div className="text-sm p-3 border-b border-slate-300 text-slate-700 space-x-3 bg-slate-200 flex items-center justify-between font-bold">
        <select
          value={selectedStyle}
          onChange={e => {
            setSelectedStyle(e.target.value)
            addStyle(e.target.value)
          }}
          className="w-full p-2 rounded border font-medium border-slate-300"
        >
          <option>Select &amp; Add a CSS Attribute</option>
          {cssAttributes.map((attribute, index) => (
            <option key={index} value={attribute}>
              {camelCaseToTitleCase(attribute)}
            </option>
          ))}
        </select>
      </div>
      <div>{renderInputs()}</div>
    </>
  )
}
