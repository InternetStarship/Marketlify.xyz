/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

export default function Elements({ element }) {
  return (
    <>
      {element.type === "text" ? (
        <p>{element.content}</p>
      ) : (
        <p>Unknown Element Type</p>
      )}
    </>
  );
}
