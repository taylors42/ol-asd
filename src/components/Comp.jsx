import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import { useGeographic } from "ol/proj";
import { addLine, addIcon, createOverlay } from "../functions/addFunc";
import {
  cleanPoints,
  cleanDuplicateDiv,
  cleanDuplicateTextContent,
  cleanDuplicatesOnArray,
} from "../functions/cleanFunc";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { routeGenerator } from "../functions/generateFunc";
import { getLocationOfPoint } from "../functions/getFunc";
export default function Comp() {
  const { map, createMap } = useContext(MapContext);
  const line = [[0, 0]];
  const layers = [new TileLayer({
    source: new OSM(),
  })]
  useEffect(() => {
      document.querySelector(".ol-viewport")?.remove(); 
      createMap(TheMap(layers));
    }, []);

    createOverlay(map, "overlay1", "teste420")

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
  return <div id="map"></div>
}
