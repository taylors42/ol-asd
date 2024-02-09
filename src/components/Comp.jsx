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

export default function Comp() {
  useGeographic();
  const { view, map, createMap } = useContext(MapContext);
  const [num, setNum] = useState(0);
  const overlays = [];
  const osm = new TileLayer({
    source: new OSM(),
  });
  const layers = [osm];

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

    createMap(TheMap(layers, overlays, view));
  }, [num]);
  function addPoint() {
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
    }
  }
  const cleanDuplicateDiv = (div) => {
    const innerDiv = document.querySelectorAll(div);
    if (innerDiv) {
      if (innerDiv.length > 1) {
        innerDiv[0].remove();
      }
    } else {
      console.error("innerDiv false");
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
        map.on("singleclick", (event) => {
          const popupDiv = document.querySelector(".ol-selectable");
          popupDiv.style.removeProperty("position");
          let pTag = document.createElement("p");
          cleanTextContent(".ol-selectable");
          if (map.getFeaturesAtPixel(event.pixel)[0] != undefined) {
            pTag.textContent = "ponto";
            popupDiv.appendChild(pTag);
            item.setPosition(event.coordinate);
          } else {
          }
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
          addPoint();
        }}
      >
        Click
      </button>
    </div>
  );
}
