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
    style: {
      padding: '10px',
    },
    elements: [],
  },
  elements: {
    headline: {
      id: null,
      properties: {},
      style: {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: '37px',
        fontWeight: 800,
      },
    },
    subheadline: {
      id: null,
      properties: {},
      style: {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: '27px',
        fontWeight: 600,
      },
    },
    paragraph: {
      id: null,
      properties: {},
      style: {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: '17px',
        fontWeight: 400,
      },
    },
    image: {
      id: null,
      properties: {},
      style: {
        borderRadius: '5px',
      },
    },
    button: {
      id: null,
      properties: {},
      style: {
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'sans-serif',
        fontSize: '17px',
        fontWeight: 600,
        padding: '10px 20px',
        borderRadius: '5px',
        display: 'inline-block',
        textAlign: 'center',
      },
    },
  },
}

export default defaults
