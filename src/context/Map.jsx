import Map from "ol/Map";
import { View } from "ol";
import TileLayer from "ol/renderer/webgl/TileLayer";
import OSM from "ol/source/OSM";
export default function TheMap(layers) {
  const view = new View({
    center: [-34.877, -8.0466 ],
    zoom: 8,
  });
  view.animate({
    center: [0, 0],
    zoom: 2,
    duration: 250,
  });
  return new Map({
    target: "map",
    layers: layers,
    view: view,
  });
}
