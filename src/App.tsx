import "./App.css";
import Comp from "./components/Comp";
import TheMap from "./context/Map";
import { MapContextProvider } from "./context/MapContext";
import React from "react";
function App() {
  return (
    <MapContextProvider>
      <div className="App">
        <Comp />
      </div>
    </MapContextProvider>
  );
}
export default App;
