import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import "../overlays.css";
import { useGeographic } from "ol/proj";
import { changePosition } from "../functions/changePosition";
import {
  createIcon,
  createLine,
  createOverlay,
  createPoint,
} from "../functions/createFunc";
import {
  cleanPoints,
  cleanDuplicateDiv,
  cleanDuplicateTextContent,
  cleanDuplicatesOnArray,
} from "../functions/cleanFunc";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { routeGenerator } from "../functions/generateFunc";
import { getLocationOfPoint, getOverlayById } from "../functions/getFunc";

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
    [-23.55052, -46.633308],
    [-22.906847, -43.172896],
    [-15.794229, -47.882166],
    [-3.731902, -38.526739],
    [-9.649849, -35.708949]
  );
  useEffect(() => {
    document.querySelector(".ol-viewport")?.remove();
    createMap(TheMap(layers));
  }, []);
  const pointId = createPoint(map, "taylor123", [-114, -46.6130027]);
  const iconId = createLine(map, line);
  const overlays = [];
  map?.on("singleclick", (event) => {
    const overlay1 = createOverlay(map, "overlayID1");
    const overlay2 = createOverlay(map, "overlayID2");
    overlays.push(overlay1, overlay2);
    const featuresId = map?.getFeaturesAtPixel(event.pixel)[0]?.getId();
    const featureLocation = map?.getFeaturesAtPixel(event.pixel)[0]
      ?.geometryChangeKey_?.target?.flatCoordinates;
    if (featuresId === iconId)
      changePosition(overlays, overlay1, featureLocation);
    else if (featuresId === pointId)
      changePosition(overlays, overlay2, featureLocation);
    else overlays.forEach((overlay) => overlay?.setPosition(undefined));
  });
  return <div id="map"></div>;
}
