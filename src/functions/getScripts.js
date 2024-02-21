import Point from "ol/geom/Point.js";
import LineString from "ol/geom/LineString.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style.js";
import { Feature } from "ol";
import { Map } from "ol";

export function getLocationOfPoint(map, array) {
  map?.getLayers().forEach((layer) => {
    if (layer instanceof VectorLayer) {
      const features = layer.getSource().getFeatures();
      features.forEach((feature) => {
        if (feature?.getGeometry() instanceof Point) {
          const coordenadas = feature?.getGeometry().getCoordinates();
          array?.push(coordenadas);
        }
      });
    }
  });
}

export function getOverlayById(map, id) {
  return map
    ?.getOverlays()
    .getArray()
    .find((obj) => obj.id === id);
}
