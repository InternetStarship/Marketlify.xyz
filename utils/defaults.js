/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

const defaults = {
  section: {
    id: null,
    title: 'Section',
    style: {},
    rows: [],
  },
  row: {
    id: null,
    title: 'Row',
    style: {},
    columns: [],
  },
  column: {
    id: null,
    title: 'Column',
    style: {},
    elements: [],
  },
  elements: [
    {
      id: null,
      type: 'text',
      content: 'New Text Element',
      style: {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: '47px',
        fontWeight: 700,
      },
    },
  ],
}

export default defaults
