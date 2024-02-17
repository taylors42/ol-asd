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
import { Map } from "ol";
import BaseLayer from "ol/layer/Base";
import BaseTileLayer from "ol/layer/BaseTile";
import TileSource from "ol/source/Tile";
import React from "react";

export default function Comp() {
  useGeographic();
  const { map, createMap } = useContext(MapContext);
  const overlays: Array<object> = [];
  const line: number[][] = [[0, 0]];

  useEffect(() => {
    document.querySelector(".ol-viewport")?.remove();
    TheMap()
  }, []);

  if (map !== null) {
    cleanPoints(map);
    cleanDuplicatesOnArray(line);
    routeGenerator(map, line, 4, "y");
    addIcon(map, line);
    map.on("singleclick", (event: any) => {
      cleanDuplicateTextContent(".ol-selectable");
      const featuresObj = map.getFeaturesAtPixel(event.pixel)[0];
      const overlay1 = map
        .getOverlays()
        .getArray()
        .find((obj: any) => obj.id === "overlay1");
      if (featuresObj !== undefined && featuresObj !==) {
        const featureLocate = featuresObj.geometryChangeKey_;
        if (featuresObj.id_ === "icone") {
          overlay1.setPosition(featureLocate.target.flatCoordinates);
        }
      } else {
        overlay1.setPosition(undefined);
      }
    });
  }
  return <div id="map"></div>;
}