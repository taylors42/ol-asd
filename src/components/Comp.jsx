import { useContext, useMemo, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import { Feature, Map } from "ol";
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
    console.log("ponto");
  };
  const cleanDuplicateDiv = (div) => {
    const innerDiv = document.querySelectorAll(div);
    if (innerDiv || innerDiv.length > 1) {
      if (innerDiv.length > 1) {
        innerDiv[0].remove();
      } else {
        console.error("without any divs here");
      }
    }
  };
  const cleanTextContent = (div) => {
    const innerDiv = document.querySelector(div);
    if (innerDiv || innerDiv.hasChildNodes) {
      while (innerDiv.firstChild) {
        innerDiv.removeChild(innerDiv.firstChild);
      }
      cleanDuplicateDiv(div);
    } else {
      console.error("line 77");
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
          const coordArr = coord.split(", ");
          const popupDiv = document.querySelector(".ol-selectable");
          popupDiv.style.removeProperty("position");
          let pTag = document.createElement("p");
          pTag.textContent = `${coord}`;
          cleanTextContent(".ol-selectable");
          popupDiv.appendChild(pTag);
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
          const layer1 = new VectorLayer({
            source: new VectorSource({
              features: [
                new Feature(
                  new Point([
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ])
                ),
              ],
            }),
          });
          if (map) {
            map.addLayer(layer1);
            console.log(map.getAllLayers()[1]);
          }
        }}
      >
        Click
      </button>
    </div>
  );
}
