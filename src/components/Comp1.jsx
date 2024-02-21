import { useContext, useEffect, useState, useRef } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import "../overlays.css";
import { Feature } from "ol";
import { useGeographic } from "ol/proj";
import Cluster from "ol/source/Cluster";
import Map from "ol/Map";
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  Stroke,
  Style,
  Text,
} from 'ol/style.js';
import { changePosition } from "../functions/changePosition";
import {
  createIcon,
  createLine,
  createOverlay,
  createPoint,
} from "../functions/createScripts";
import {
  cleanPoints,
  cleanDuplicateDiv,
  cleanDuplicateTextContent,
  cleanDuplicatesOnArray,
} from "../functions/cleanScripts";
import { cleanAllOverlaysOnMap } from "../functions/changePosition";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { routeGenerator } from "../functions/generateScripts";
import { getLocationOfPoint, getOverlayById } from "../functions/getScripts";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Overlay from "ol/Overlay";
export default function Comp1() {
  useGeographic();
  const { map, createMap } = useContext(MapContext);
  const line = [[0, 0]];
  const layers = [
    new TileLayer({
      source: new OSM(),
    }),
  ];
  line.push(
    [-30.034, -51.217], // Porto Alegre, RS
    [-27.593, -48.558], // Florianópolis, SC
    [-25.428, -49.273], // Curitiba, PR
    [-22.906, -43.172], // Rio de Janeiro, RJ
    [-13.007, -38.526], // Salvador, BA
    [-8.052, -34.928], // Recife, PE
    [-5.779, -35.2] // Natal, RN
  );

  useEffect(() => {
      document.querySelector(".ol-viewport")?.remove();
    createMap(TheMap(layers));
  }, []);

const pontos = [
  new Feature({
    geometry: new Point([0, 0]),
    nome: "Ponto 1",
    data: "01/01/2024",
  }),
  
  new Feature({
    geometry: new Point([10, 10]),
    nome: "Ponto 2",
    data: "02/02/2024",
  }),

  new Feature({
    geometry: new Point([20, 20]),
    nome: "ponto 3",
    data: "10/10/2020",
  }),
  new Feature({
    geometry: new Point([23, 23]),
    nome: "ponto 3",
    data: "10/10/2020",
  }),
  new Feature({
    geometry: new Point([27, 27]),
    nome: "ponto 3",
    data: "10/10/2020",
  }),
];

const source = new VectorSource({
  features: pontos,
});

const clusterSource = new Cluster({
  distance: 70,
  source: source,
});

const clusterLayer = new VectorLayer({
  source: clusterSource,
  renderBuffer: true,
  style: function(feature) {
    const size = feature.get('features').length > 1 ? feature.get('features').length : " "
    return new Style({
      image: new CircleStyle({
        radius: 10,
        stroke: new Stroke({
          color: '#fff',
        }),
        fill: new Fill({
          color: '#3399CC',
        }),
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({
          color: '#fff',
        }),
      }),
    });
  },
});

map?.addLayer(clusterLayer);
map?.on("singleclick", () => {console.log("err")})
  return <div id="map"></div>;
}