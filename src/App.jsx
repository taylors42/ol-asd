import "./App.css";
import Comp from "./components/Comp";
import Comp1 from "./components/Comp1";
import { MapContextProvider } from "./context/MapContext";
function App() {
  return (
    <MapContextProvider>
      <div className="container">
        <Comp1 />
        <div className="main"></div>
      </div>
    </MapContextProvider>
  );
}
export default App;
