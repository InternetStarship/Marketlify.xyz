/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import Sidebar from "../components/Sidebar";

import { useState } from "react";

export default function Builder() {
  const [page, setPage] = useState({
    page: {
      background: {
        color: "#ffffff",
        image: {
          url: "",
          position: "center",
          repeat: "no-repeat",
          size: "cover",
        },
      },
      color: "#000000",
      fontFamily: "sans-serif",
    },
    seo: {
      title: "",
      description: "",
      keywords: "",
      url: "",
      image: "",
      favicon: "",
    },
    code: {
      head: "",
      body: "",
    },
    sections: [
      {
        id: 1,
        title: "Section 1",
        style: {
          background: {
            color: "#ffffff",
            image: {
              url: "",
              position: "center",
              repeat: "no-repeat",
              size: "cover",
            },
          },
          border: {
            width: 0,
            style: "solid",
            color: "#000000",
          },
          shadow: {
            x: 0,
            y: 0,
            blur: 0,
            spread: 0,
            color: "#000000",
          },
        },
        rows: [
          {
            id: 2,
            style: {
              background: {
                color: "#ffffff",
                image: {
                  url: "",
                  position: "center",
                  repeat: "no-repeat",
                  size: "cover",
                },
              },
              border: {
                width: 0,
                style: "solid",
                color: "#000000",
              },
              shadow: {
                x: 0,
                y: 0,
                blur: 0,
                spread: 0,
                color: "#000000",
              },
            },
            columns: [
              {
                id: 3,
                elements: [
                  {
                    id: 4,
                    type: "text",
                    content: "Hello World!",
                    style: {
                      color: "#000000",
                      fontFamily: "sans-serif",
                      fontSize: 16,
                      fontWeight: 400,
                      fontStyle: "normal",
                      textDecoration: "none",
                      textAlign: "left",
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
    ], // this is test data
  });

  return (
    <main className="w-full h-screen overflow-hidden bg-slate-300">
      <Toolbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-full">
          <Canvas page={page} />
        </div>
      </div>
    </main>
  );
}
