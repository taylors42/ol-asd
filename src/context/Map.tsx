import { Map } from "ol";
import { View } from "ol";
import BaseTileLayer from "ol/layer/BaseTile";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/renderer/webgl/TileLayer";
import { OSM } from "ol/source";

export default function TheMap() {
  return new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [-110, 45],
      zoom: 2,
      maxZoom: 14,
    }),
  });
}
