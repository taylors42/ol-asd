import React, { createContext, useState } from "react";

const mapContext = createContext();

export function MapContextProvider({ children, value }) {
  const [map, createMap] = useState(null);

  return (
    <mapContext.Provider value={{ map, createMap }}>
      {children}
    </mapContext.Provider>
  );
}
