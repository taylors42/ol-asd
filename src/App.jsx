import "./App.css";
import Comp from "./components/Comp";
import TheMap from "./context/Map";
<<<<<<< HEAD
import { mapContextProvider } from "./context/MapContext";
import React from "react";
=======
import { MapContextProvider } from "./context/MapContext";

>>>>>>> parent of 8271ace (.)
function App() {
  return (
    <mapContextProvider>
      <Comp />
    </mapContextProvider>
  );
}
export default App;
