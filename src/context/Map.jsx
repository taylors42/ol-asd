import Map from "ol/Map";
import { View } from "ol";
import TileLayer from "ol/renderer/webgl/TileLayer";
import OSM from "ol/source/OSM";
export default function TheMap(layers) {
  return new Map({
    target: "map",
    layers: layers,
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
}
