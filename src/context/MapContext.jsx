import { createContext, useState } from "react";
import { View } from "ol";
export const MapContext = createContext();

export function MapContextProvider({ children, value }) {
  const [map, createMap] = useState(null);
  const [view, setView] = useState(
    new View({
      center: [-5639523.95, -3501274.52],
      zoom: 2,
    })
  );

  return (
    <MapContext.Provider value={{ map, createMap, view, setView }}>
      {children}
    </MapContext.Provider>
  );
}
