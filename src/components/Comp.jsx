import { useContext, useEffect, useState, useRef } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import "../overlays.css";
import { Feature } from "ol";
import { useGeographic } from "ol/proj";
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
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { routeGenerator } from "../functions/generateScripts";
import { getLocationOfPoint, getOverlayById } from "../functions/getScripts";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Overlay from "ol/Overlay";
export default function Comp() {
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
  const overlays = [];
  const points = [];
  const ponto1 = createPoint(map, "overlayID1", [0, 0], "ponto1");
  const ponto2 = createPoint(map, "overlayID2", [10, 10], "ponto2");
  points.push(ponto1, ponto2);
  map?.on("singleclick", (event) => {
    const coord = map?.getFeaturesAtPixel(event.pixel)[0]?.geometryChangeKey_
      ?.target?.flatCoordinates;
    const featuresId = map?.getFeaturesAtPixel(event.pixel)[0]?.getId();
    changePosition(map, points, featuresId, coord);
  });
  return <div id="map"></div>;
}
