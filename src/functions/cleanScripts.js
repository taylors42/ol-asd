import Point from "ol/geom/Point.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";

export function cleanPoints(map) {
  map?.getLayers().forEach((layer) => {
    if (layer instanceof VectorLayer) {
      const features = layer.getSource().getFeatures();
      features.forEach((feature) => {
        if (feature?.getGeometry() instanceof Point) {
          layer.getSource().removeFeature(feature);
        }
      });
    }
  });
}

export function cleanDuplicateDiv(div) {
  const innerDiv = document.querySelectorAll(div);
  if (innerDiv?.length >= 1) {
    innerDiv[0].remove();
  }
}

export function cleanDuplicateTextContent(divSelector) {
  const innerDiv = document.querySelector(divSelector);

  if (innerDiv?.childNodes.length >= 1) {
    while (innerDiv.firstChild !== null) {
      const firstChild = innerDiv.firstChild;
      if (firstChild !== null) {
        innerDiv.removeChild(firstChild);
      }
    }
    cleanDuplicateDiv(divSelector);
  }
}

export function cleanDuplicatesOnArray(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        array.splice(j, 1);
        j--;
      }
    }
  }
}
