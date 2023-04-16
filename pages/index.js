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
          backgroundColor: "#ffffff",
          backgroundImage: "",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderWidth: 0,
          borderStyle: "solid",
          borderColor: "#000000",
          boxShadowX: 0,
          boxShadowY: 0,
          boxShadowBlur: 0,
          boxShadowSpread: 0,
          boxShadowColor: "#000000",
          layoutWidth: "100%",
          layoutHeight: "100%",
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
        },
        rows: [
          {
            id: 2,
            style: {
              backgroundColor: "#ffffff",
              backgroundImage: "",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderWidth: 0,
              borderStyle: "solid",
              borderColor: "#000000",
              boxShadowX: 0,
              boxShadowY: 0,
              boxShadowBlur: 0,
              boxShadowSpread: 0,
              boxShadowColor: "#000000",
              layoutWidth: "100%",
              layoutHeight: "100%",
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
                    type: "text",
                    content: "Hello World!",
                    style: {
                      color: "#000000",
                      fontFamily: "sans-serif",
                      fontSize: 46,
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
  const [current, setCurrent] = useState("");
  const [selectedId, setSelectedId] = useState("");

  function edit(element) {
    setCurrent("editing");
    setSelectedId(element.id);
  }

  function settings() {
    setCurrent("settings");
  }

  function closeSidebar() {
    setCurrent("");
  }

  return (
    <main className="w-full h-screen overflow-hidden bg-slate-300">
      <Toolbar />
      <div className="flex flex-row">
        <Sidebar
          current={current}
          selectedId={selectedId}
          page={page}
          close={closeSidebar}
        />
        <div className="w-full">
          <Canvas page={page} edit={edit} />
        </div>
      </div>
    </main>
  );
}
