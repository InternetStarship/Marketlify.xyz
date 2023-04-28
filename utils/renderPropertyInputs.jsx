import { handlePropertyChange } from './handlePropertyChange'
import { prettyLabel } from './prettyLabel'
import { removeStyle } from './removeStyle'
import { FaTimes } from 'react-icons/fa'

export function renderPropertyInputs(styles, properties, setProperties, updatePage, page, selectedId) {
  if (styles) {
    return Object.entries(properties).map(([key, value]) => {
      return (
        <div key={key} className="sidebar-fieldset">
          <label className="sidebar-label" htmlFor={key}>
            {prettyLabel(key)}
            <div
              onClick={() => {
                removeStyle(key)
              }}
            >
              <FaTimes />
            </div>
          </label>

          <input
            className="sidebar-input"
            type="text"
            id={key}
            name={key}
            value={value}
            onChange={event => {
              handlePropertyChange(event, properties, setProperties, updatePage, page, selectedId)
            }}
          />
        </div>
      )
    })
  }
}
