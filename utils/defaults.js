/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

const defaults = {
  section: {
    id: null,
    properties: {
      id: '',
      class: '',
    },
    style: {},
    rows: [],
  },
  row: {
    id: null,
    properties: {
      id: '',
      class: '',
    },
    style: {},
    columns: [],
  },
  column: {
    id: null,
    properties: {
      id: '',
      class: '',
    },
    style: {
      padding: '10px',
    },
    elements: [],
  },
  elements: {
    headline: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: '37px',
        fontWeight: 800,
      },
    },
    subheadline: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: '27px',
        fontWeight: 600,
      },
    },
    paragraph: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: '17px',
        fontWeight: 400,
      },
    },
    image: {
      id: null,
      properties: {
        id: '',
        class: '',
        src: 'https://placekitten.com/300/300',
        alt: 'Placeholder Image',
      },
      style: {
        width: '100%',
        borderRadius: '5px',
      },
    },
    button: {
      id: null,
      properties: {
        id: '',
        class: '',
        action: 'link',
        target: '_blank',
      },
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
