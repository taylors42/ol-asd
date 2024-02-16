import { useContext, useEffect, useState, useRef } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import { Feature } from "ol";
import { Vector as VectorSource } from "ol/source";
import { OSM } from "ol/source";
import Point from "ol/geom/Point.js";
import { Overlay } from "ol";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useGeographic } from "ol/proj";
import { addLine, addIcon, createOverlay } from "../functions/addFunc";
import {
  cleanPoints,
  cleanDuplicateDiv,
  cleanDuplicateTextContent,
  cleanDuplicatesOnArray,
} from "../functions/cleanFunc";
import { routeGenerator } from "../functions/generateFunc";
import { getLocationOfPoint } from "../functions/getFunc";

export default function Comp() {
  useGeographic();
  const { view, map, createMap } = useContext(MapContext);
  const overlayDiv = document.querySelector(".ol-selectable");
  const overlay1Ref = useRef()

  const line = [[0, 0]];
  const layers = [
    new TileLayer({
      source: new OSM(),
    }),
  ];

  useEffect(() => {
    if (document.querySelector(".ol-viewport")) {
      document.querySelector(".ol-viewport").remove();
    }
    createMap(TheMap(layers, view));
  }, []);
  if(map){

    createOverlay(map, "overlay1", "teste420")
  }
  // if (map !== null) {
  //   cleanPoints(map);
  //   cleanDuplicatesOnArray(line);
  //   routeGenerator(map, line, 4, "y");
  //   addIcon(map, line);
  //   map.on("singleclick", (event) => {
  //     cleanDuplicateTextContent(".ol-selectable");
  //     overlayDiv.style.removeProperty("position");
  //     const featuresObj = map.getFeaturesAtPixel(event.pixel)[0];
  //     createMap(map, "overlay1", overlay1Ref.current)
  //     const overlay1 = map
  //       .getOverlays()
  //       .getArray()
  //       .find((obj) => obj.id === "overlay1");
  //     if (featuresObj !== undefined) {
  //       const featureLocate = featuresObj.geometryChangeKey_;
  //       if (featuresObj.id_ === "icone") {
  //         if (document.querySelector(".ol-selectable").textContent === "") {
  //           document.querySelector(".ol-selectable").textContent =
  //             featuresObj.id_;
  //         }
  //         overlay1.setPosition(featureLocate.target.flatCoordinates);
  //       }
  //     } else {
  //       overlay1.setPosition(undefined);
  //     }
  //   });
  // }
  return (
  <div id="map">
    <div id="overlay2"></div>
  </div>
  )
}
