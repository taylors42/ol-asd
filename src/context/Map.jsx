import { Map } from "ol";
<<<<<<< HEAD
import { View } from "ol";
import BaseLayer from "ol/layer/Base";
import BaseTileLayer from "ol/layer/BaseTile";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/renderer/webgl/TileLayer";
import OSM from "ol/source/OSM";
export default function TheMap() {
  new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
=======

export default function TheMap(layers, view) {
  return new Map({
    target: document.getElementById("map"),
    layers: layers,
    view: view,
>>>>>>> parent of 8271ace (.)
  });
}