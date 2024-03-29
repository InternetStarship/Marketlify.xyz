const master = {
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
    style: {
      columnGap: '20px',
    },
    columns: [],
  },

  column: {
    id: null,
    properties: {
      id: '',
      class: '',
    },
    style: {},
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
        fontSize: '37px',
        fontWeight: 800,
        marginTop: '10px',
      },
    },

    subheadline: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        fontSize: '27px',
        fontWeight: 600,
        marginTop: '10px',
      },
    },

    paragraph: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        fontSize: '17px',
        fontWeight: 400,
        marginTop: '10px',
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
        marginTop: '10px',
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
        backgroundColor: '#000',
        fontSize: '17px',
        fontWeight: 600,
        padding: '10px 20px',
        borderRadius: '5px',
        display: 'inline-block',
        textAlign: 'center',
        marginTop: '10px',
      },
    },

    list: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        fontSize: '17px',
        fontWeight: 400,
        marginTop: '10px',
      },
    },

    video: {
      id: null,
      properties: {
        id: '',
        class: '',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=WYjgHLFZMa0',
      },
      style: {
        marginTop: '10px',
      },
    },

    icon: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        marginTop: '10px',
      },
    },

    divider: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        margin: '10px 0',
      },
    },

    label: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        fontSize: '15px',
        fontWeight: 500,
        marginTop: '10px',
      },
    },

    input: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '4px',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
      },
    },

    textarea: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '4px',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
      },
    },

    select: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '4px',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
      },
    },

    checkbox: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        fontSize: '15px',
        fontWeight: 500,
      },
    },

    radio: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {
        fontSize: '15px',
        fontWeight: 500,
      },
    },

    customHTML: {
      id: null,
      properties: {
        id: '',
        class: '',
      },
      style: {},
    },
  },
}

export default master
