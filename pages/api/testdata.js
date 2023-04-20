/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

export default function handler(req, res) {
  res.status(200).json({
    seo: {
      title: '',
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
        backgroundImage: '',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: '#000000',
        fontFamily: 'sans-serif',
      },
      sections: [
        {
          id: 1,
          properties: {},
          style: {
            backgroundColor: '#ffffff',
            backgroundImage: '',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderWidth: '0px',
            borderStyle: 'solid',
            borderColor: '#000000',
            boxShadowX: '0px',
            boxShadowY: '0px',
            boxShadowBlur: '0px',
            boxShadowSpread: '0px',
            boxShadowColor: '#000000',
            layoutWidth: '100%',
            layoutHeight: '100%',
            paddingTop: '20px',
            paddingRight: '20px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          rows: [
            {
              id: 2,
              properties: {},
              style: {
                backgroundColor: '#eee',
                backgroundImage: '',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderWidth: '2px',
                borderStyle: 'dotted',
                borderColor: '#000000',
                boxShadowX: '0px',
                boxShadowY: '0px',
                boxShadowBlur: '0px',
                boxShadowSpread: '0px',
                boxShadowColor: '#000000',
                layoutWidth: '100%',
                layoutHeight: '100%',
                paddingTop: '10px',
                paddingRight: '10px',
                paddingBottom: '10px',
                paddingLeft: '10px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              columns: [
                {
                  id: 3,
                  properties: {},
                  elements: [
                    {
                      id: 4,
                      properties: {},
                      style: {
                        color: '#6A9FB5',
                        fontFamily: 'sans-serif',
                        fontSize: '47px',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        textDecoration: 'none',
                        textAlign: 'left',
                        lineHeight: 1.5,
                        letterSpacing: '0px',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    content: [
      {
        id: 4,
        type: 'headline',
        content: 'Hello World!',
      },
    ],
  })
}
