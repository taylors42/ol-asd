import React, { ReactNode, createContext, useState } from "react";
import { Map } from "ol";

interface mapContextType {
  map: Map;
  createMap: React.Dispatch<React.SetStateAction<Map>>;
}

interface mapContextProviderProps {
  children: ReactNode;
}

const mapContext = createContext<mapContextType | undefined>(undefined);
export function mapContextProvider({ children }: mapContextProviderProps) {
  const [map, createMap] = useState(null);

  return (
    <mapContext.Provider value={{ map, createMap }}>
      {children}
    </mapContext.Provider>
  );
}
