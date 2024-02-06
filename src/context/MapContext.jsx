import { createContext, useState } from "react";
export const MapContext = createContext();

export function MapContextProvider({ children, value }) {
  const [map, setMap] = useState(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
}
