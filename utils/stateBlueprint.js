const stateBlueprint = {
  funnel: {
    name: 'Untitled Funnel',
    pages: [],
  },
  page: {
    id: '',
    name: '',
    size: 0,
    created_at: '',
    data: {},
  },
  sidebar: {
    expanded: true,
  },
  popup: {
    open: false,
    type: 'welcome',
  },
  active: {
    current: '',
    selectedId: '',
    viewport: 'desktop',
    fullscreen: false,
  },
  undo: {
    history: [],
    isAction: false,
  },
}

export default stateBlueprint
