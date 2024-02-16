import { useContext, useEffect, useState } from "react";
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
import { addLine, addIcon } from "../functions/addFunc";
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
  const overlays = [];
  const line = [[0, 0]];
  const layers = [
    new TileLayer({
      source: new OSM(),
    }),
  ];

  useEffect(() => {
    const container = document.getElementById("popup");
    const overlay1 = new Overlay({
      id: "overlay1",
      element: container,
    });
    if (document.querySelector(".ol-viewport")) {
      document.querySelector(".ol-viewport").remove();
    }
    overlays.push(overlay1);
    createMap(TheMap(layers, overlays, view));
  }, []);

  if (map !== null) {
    cleanPoints(map);
    cleanDuplicatesOnArray(line);
    routeGenerator(line, 2);
    addLine(map, line);
    addIcon(map, line);
    const overlaysMap = map.getOverlays().getArray();
    map.on("singleclick", (event) => {
      console.log(event);
      cleanDuplicateTextContent(".ol-selectable");
      overlayDiv.style.removeProperty("position");
      const featuresObj = map.getFeaturesAtPixel(event.pixel)[0];
      if (featuresObj !== undefined) {
        document.querySelector(".ol-selectable").style.display = "flex";
        const featureLocate = featuresObj.geometryChangeKey_;
        if (featuresObj.id_ === "line" || featuresObj.id_ === "icone") {
          overlaysMap.forEach((item) => {
            if (item.id === "overlay1") {
              if (document.querySelector(".ol-selectable").textContent === "") {
                document.querySelector(".ol-selectable").textContent =
                  featuresObj.id_;
                console.log(featuresObj);
              }
              item.setPosition(featureLocate.target.flatCoordinates);
            }
          });
        }
      } else {
        document.querySelector(".ol-selectable").style.display = "none";
      }
    });
  }
  return <div id="map"></div>;
}
