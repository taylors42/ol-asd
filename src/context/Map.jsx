import { Map } from "ol";

export default function TheMap(layers, overlays, view) {
  return new Map({
    target: document.getElementById("map"),
    layers: layers,
    overlays: overlays,
    view: view,
  });
}
