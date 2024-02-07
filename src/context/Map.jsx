import { Map } from "ol";
export default function TheMap(
  layerList,
  userView,
  controlsParameters,
  overlayArray
) {
  const map = new Map({
    controls: controlsParameters,
    target: document.getElementById("map"),
    layers: layerList,
    overlays: overlayArray,
    view: userView,
  });

  return map;
}
