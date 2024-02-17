<<<<<<< HEAD
import React, { createContext, useState } from "react";

const mapContext = createContext();

export function MapContextProvider({ children, value }) {
  const [map, createMap] = useState(null);

  return (
    <mapContext.Provider value={{ map, createMap }}>
      {children}
    </mapContext.Provider>
=======
import { createContext, useState } from "react";
import { View } from "ol";
export const MapContext = createContext();

export function MapContextProvider({ children, value }) {
  const [map, createMap] = useState(null);
  const [view, setView] = useState(
    new View({
      center: [-110, 45],
      zoom: 2,
      maxZoom: 14,
    })
  );

  return (
    <MapContext.Provider value={{ map, createMap, view, setView }}>
      {children}
    </MapContext.Provider>
>>>>>>> parent of 8271ace (.)
  );
}
