import { useContext, useEffect, useState, useRef } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import "../overlays.css";
import { Feature } from "ol";
import { useGeographic } from "ol/proj";
import Map from "ol/Map";
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
    createMap(TheMap(layers));
  }, []);
  const infoOverlay = new Overlay({
    element: document.createElement("div"),
    className: "overlayID1",
  });
  map?.addOverlay(infoOverlay);
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
  ];
  const vectorSource = new VectorSource({
    features: pontos,
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });
  console.log(map instanceof Map);
  map?.addLayer(vectorLayer);
  map?.on("click", function (event) {
    console.log("click");
    if (map?.getFeaturesAtPixel(event.pixel)[0] == undefined)
      cleanAllOverlaysOnMap(map);
    map?.forEachFeatureAtPixel(event.pixel, function (feature) {
      const nome = feature.get("nome");
      const data = feature.get("data");
      infoOverlay.getElement().innerHTML = `Nome: ${nome}<br>Data: ${data}<br>`;
      infoOverlay.setPosition(event.coordinate);
    });
  });

  return <div id="map"></div>;
}
