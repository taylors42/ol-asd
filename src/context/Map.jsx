import { Map } from "ol";

export default function TheMap(layers, view) {
  return new Map({
    target: document.getElementById("map"),
    layers: layers,
    view: view,
  });
}
