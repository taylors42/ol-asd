import "./App.css";
import Comp from "./components/Comp";
import TheMap from "./context/Map";
import { mapContextProvider } from "./context/MapContext";
import React from "react";
function App() {
  return (
    <mapContextProvider>
      <Comp />
    </mapContextProvider>
  );
}
export default App;
