import { Map } from "ol";
import "../App.css";
import { useEffect } from "react";
import View from "ol/View";
import { Feature } from "ol";
import Geolocation from "ol/Geolocation";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import { useGeographic } from "ol/proj.js";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Point from "ol/geom/Point.js";

export default function TheMap(layerList) {
  const map = new Map({
    target: document.getElementById("map"),
    layers: layerList,
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
  return map;
}
