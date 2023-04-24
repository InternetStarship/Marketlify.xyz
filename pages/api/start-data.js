/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

export default function handler(req, res) {
  res.status(200).json({
    funnel: {
      id: 1,
      name: 'Untitled Funnel',
    },
    pages: [
      {
        id: 1,
        funnelId: 1,
        funnelIndex: 0,
        seo: {
          title: 'Untitled Page',
          description: '',
          url: '',
          image: '',
          favicon: '',
        },
        code: {
          head: '',
          footer: '',
        },
        styles: {
          body: {
            backgroundColor: '#ffffff',
            color: '#000000',
            fontFamily: 'sans-serif',
          },
          sections: [],
        },
        content: [],
      },
      {
        id: 2,
        funnelId: 1,
        funnelIndex: 1,
        seo: {
          title: 'Untitled Page 2',
          description: '',
          url: '',
          image: '',
          favicon: '',
        },
        code: {
          head: '',
          footer: '',
        },
        styles: {
          body: {
            backgroundColor: '#ffffff',
            color: '#000000',
            fontFamily: 'sans-serif',
          },
          sections: [],
        },
        content: [],
      },
    ],
  })
}
