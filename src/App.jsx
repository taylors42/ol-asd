import "./App.css";
import Comp from "./components/Comp";
import Comp1 from "./components/Comp1";
import { MapContextProvider } from "./context/MapContext";
function App() {
  return (
    <MapContextProvider>
      <Comp1 />
    </MapContextProvider>
  );
}
export default App;
