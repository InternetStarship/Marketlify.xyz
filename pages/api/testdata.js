/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    page: {
      backgroundColor: '#ffffff',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      color: '#000000',
      fontFamily: 'sans-serif',
    },
    seo: {
      title: '',
      description: '',
      keywords: '',
      url: '',
      image: '',
      favicon: '',
    },
    code: {
      head: '',
      body: '',
    },
    sections: [
      {
        id: 1,
        title: 'Section 1',
        style: {
          backgroundColor: '#ffffff',
          backgroundImage: '',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderWidth: 0,
          borderStyle: 'solid',
          borderColor: '#000000',
          boxShadowX: 0,
          boxShadowY: 0,
          boxShadowBlur: 0,
          boxShadowSpread: 0,
          boxShadowColor: '#000000',
          layoutWidth: '100%',
          layoutHeight: '100%',
          paddingTop: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
          paddingLeft: '20px',
          marginTop: '10px',
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
        },
        rows: [
          {
            id: 2,
            style: {
              backgroundColor: '#ffffff',
              backgroundImage: '',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              borderWidth: 0,
              borderStyle: 'solid',
              borderColor: '#000000',
              boxShadowX: 0,
              boxShadowY: 0,
              boxShadowBlur: 0,
              boxShadowSpread: 0,
              boxShadowColor: '#000000',
              layoutWidth: '100%',
              layoutHeight: '100%',
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,
            },
            columns: [
              {
                id: 3,
                elements: [
                  {
                    id: 4,
                    type: 'text',
                    content: 'Hello World!',
                    style: {
                      color: '#6A9FB5',
                      fontFamily: 'sans-serif',
                      fontSize: '47px',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      textDecoration: 'none',
                      textAlign: 'left',
                      lineHeight: 1.5,
                      letterSpacing: 0,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  })
}
