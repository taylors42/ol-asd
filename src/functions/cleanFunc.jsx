import Point from "ol/geom/Point.js";
import LineString from "ol/geom/LineString.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style.js";
import { Feature } from "ol";
import { Map } from "ol";

export function cleanPoints(map) {
  map.getLayers().forEach((layer) => {
    if (layer instanceof VectorLayer) {
      const features = layer.getSource().getFeatures();
      features.forEach((feature) => {
        if (feature.getGeometry() instanceof Point) {
          layer.getSource().removeFeature(feature);
        }
      });
    }
  });
}

export function cleanDuplicateDiv(div) {
  const innerDiv = document.querySelectorAll(div);
  if (innerDiv && innerDiv.length > 1) {
    innerDiv[0].remove();
  }
}

export function cleanDuplicateTextContent(divSelector) {
  const innerDiv = document.querySelector(divSelector);

  if (innerDiv !== null && innerDiv.childNodes.length >= 1) {
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
