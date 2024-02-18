import { createContext, useState } from "react";

export const MapContext = createContext();

export function MapContextProvider({ children, value }) {
  const [map, createMap] = useState(null);

  return (
    <MapContext.Provider value={{ map, createMap }}>
      {children}
    </MapContext.Provider>
  );
}
