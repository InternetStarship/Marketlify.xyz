const stateBlueprint = {
  funnel: {
    name: 'Untitled Funnel',
    pages: null,
  },
  page: {
    name: 'Untitled Page',
    content: null,
  },
  sidebar: {
    expanded: true,
  },
  popup: {
    open: false,
    type: 'welcome',
  },
  active: {
    current: null,
    selectedId: null,
    viewport: 'desktop',
    fullscreen: false,
  },
  undo: {
    history: null,
    isAction: false,
  },
}

export default stateBlueprint
