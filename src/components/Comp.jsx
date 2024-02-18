import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import "../overlays.css";
import { useGeographic } from "ol/proj";
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
    [-23.55052, -46.633308], // São Paulo, Brasil
    [-22.906847, -43.172896], // Rio de Janeiro, Brasil
    [-15.794229, -47.882166], // Brasília, Brasil
    [-3.731902, -38.526739], // Fortaleza, Brasil
    [-9.649849, -35.708949] // Maceió, Brasil
  );
  useEffect(() => {
    document.querySelector(".ol-viewport")?.remove();
    createMap(TheMap(layers));
  }, []);
  createPoint(map, [-114, -46.6130027]);
  createLine(map, line);
  map?.on("singleclick", (event) => {
    const overlay1 = createOverlay(map, "overlayID1");
    const overlay2 = createOverlay(map, "overlayID2");
    const featuresObj = map?.getFeaturesAtPixel(event.pixel)[0];
    console.log(featuresObj);
    const featureLoc = featuresObj?.geometryChangeKey_;
    cleanDuplicateTextContent(featuresObj?.id_);
    const teste =
      featuresObj?.id_ == "icon"
        ? overlay1?.setPosition(featureLoc?.target.flatCoordinates)
        : overlay1?.setPosition(undefined);
    const test1 =
      featuresObj?.id_ == "line"
        ? overlay2?.setPosition(featureLoc?.target.flatCoordinates)
        : overlay2?.setPosition(undefined);
  });
  return <div id="map"></div>;
}
