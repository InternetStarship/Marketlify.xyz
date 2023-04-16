/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

export default function Canvas({ page }) {
  return (
    <main id="canvasContainer">
      <div id="mainCanvas">
        {page.sections.map((section) => (
          <div className="section" key={section.id} style={section.style}>
            {section.rows.map((row) => (
              <div className="row" key={row.id} style={row.style}>
                {row.columns.map((column) => (
                  <div className="column" key={column.id}>
                    {column.elements.map((element) => (
                      <div
                        className="element"
                        key={element.id}
                        style={element.style}
                      >
                        {element.type === "text" ? (
                          <p>{element.content}</p>
                        ) : (
                          <p>Unknown Element Type</p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
