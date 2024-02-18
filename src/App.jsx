import "./App.css";
import Comp from "./components/Comp";
import { MapContextProvider } from "./context/MapContext";
function App() {
  return (
    <MapContextProvider>
      <Comp />
    </MapContextProvider>
  );
}
export default App;
