import { useContext, useMemo, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import { Feature } from "ol";
import { Vector as VectorSource } from "ol/source";
import { OSM } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Point from "ol/geom/Point.js";
import { useGeographic } from "ol/proj.js";
import { Overlay } from "ol";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
import { defaults as defaultControls } from "ol/control.js";

export default function Comp() {
  useGeographic();
  const { view, map, createMap } = useContext(MapContext);
  const [num, setNum] = useState(0);
  const overlays = [];
  const osm = new TileLayer({
    source: new OSM(),
  });
  const layers = [osm];
  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: "EPSG:4326",
    className: "custom-mouse-position",
    target: document.getElementById("mouse-position"),
  });

  useEffect(() => {
    const container = document.getElementById("popup");
    const overlay1 = new Overlay({
      id: "overlay1",
      element: container,
    });
    const TEMP = document.querySelector(".ol-viewport");
    if (TEMP) {
      TEMP.remove();
    }
    overlays.push(overlay1);

    createMap(
      TheMap(
        layers,
        defaultControls().extend([mousePositionControl]),
        overlays,
        view
      )
    );
  }, [num]);
  const addPoint = () => {
    if (map) {
      const coordinates = [0, 0];
      const point = new Point(coordinates);
      const pointFeature = new Feature(point);
      const vectorSource = new VectorSource({
        features: [pointFeature],
      });
      const vectorLayer = new TileLayer({
        source: vectorSource,
      });
      map.addLayer(vectorLayer);
    }
  };
  const cleanDuplicateDiv = (div) => {
    const innerDiv = document.querySelectorAll(div);
    if (innerDiv) {
      if (innerDiv.length > 1) {
        console.log(2);
        innerDiv[0].remove();
        console.log("First div removed with sucess!");
      } else {
        console.error("without any divs here");
      }
    }
  };
  const cleanTextContent = (div) => {
    const innerDiv = document.querySelector(div);
    if (innerDiv) {
      if (innerDiv.hasChildNodes()) {
        while (innerDiv.firstChild) {
          innerDiv.removeChild(innerDiv.firstChild);
        }
        console.log("end while");
        cleanDuplicateDiv(div);
      } else {
        console.log("error second node on if (popupContent.hasChildNodes()");
      }
    } else {
      console.log("error on if (popupContent)");
    }
  };

  if (map !== null) {
    const overlaysMap = map.getOverlays().getArray();
    overlaysMap.forEach((item) => {
      if (item.id == "overlay1") {
        map.on("singleclick", () => {
          const coord = document.querySelector(
            ".custom-mouse-position"
          ).textContent;
          const popupDiv = document.querySelector(".ol-selectable");
          popupDiv.style.removeProperty("position");
          let pTag = document.createElement("p");
          pTag.textContent = "Overlay";
          cleanTextContent(".ol-selectable");
          popupDiv.appendChild(pTag);
          const coordArr = coord.split(", ");
          item.setPosition(coordArr);
        });
      }
    });
  }
  return (
    <div id="map">
      <button
        className="botao"
        style={{ position: "absolute", zIndex: "10" }}
        onClick={() => {
          setNum(num + 1);
        }}
      >
        Click
      </button>
    </div>
  );
}
