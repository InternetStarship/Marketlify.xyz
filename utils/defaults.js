/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

const defaults = {
  section: {
    id: null,
    properties: {},
    style: {},
    rows: [],
  },
  row: {
    id: null,
    properties: {},
    style: {},
    columns: [],
  },
  column: {
    id: null,
    properties: {},
    style: {},
    elements: [],
  },
  elements: [
    {
      id: null,
      properties: {},
      style: {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: '37px',
        fontWeight: 700,
      },
    },
  ],
}

export default defaults
