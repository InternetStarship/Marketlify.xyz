import { handlePropertyChange } from '../style/handlePropertyChange'
import { prettyLabel } from '../utility/prettyLabel'
import { removeStyle } from '../style/removeStyle'
import { FaTimes } from 'react-icons/fa'

export function renderPropertyInputs(styles, properties, setProperties, state, selectedId) {
  if (styles) {
    return Object.entries(properties).map(([key, value]) => {
      return (
        <div key={key} className="sidebar-fieldset sidebar-property">
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
              handlePropertyChange(event, properties, setProperties, state, selectedId)
            }}
          />
        </div>
      )
    })
  }
}
