import { createContext, useState } from "react";
import { View } from "ol";
export const MapContext = createContext();

export function MapContextProvider({ children, value }) {
  const [map, setMap] = useState(null);
  const [userView, setUserView] = useState(
    new View({
      center: [0, 0],
      zoom: 2,
    })
  );
  const [mousePosition, setMousePosition] = useState(null);

  return (
    <MapContext.Provider value={{ map, setMap, userView }}>
      {children}
    </MapContext.Provider>
  );
}
