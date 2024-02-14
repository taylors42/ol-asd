import { createContext, useState } from "react";
import { View } from "ol";
export const MapContext = createContext();

export function MapContextProvider({ children, value }) {
  const [map, createMap] = useState(null);
  const [view, setView] = useState(
    new View({
      center: [-110, 45],
      zoom: 6,
    })
  );

  return (
    <MapContext.Provider value={{ map, createMap, view, setView }}>
      {children}
    </MapContext.Provider>
  );
}
