import { Map } from "ol";

export default function TheMap(layers, controls, overlays, view) {
  return new Map({
    target: document.getElementById("map"),
    controls: controls,
    layers: layers,
    overlays: overlays,
    view: view,
  });
}
