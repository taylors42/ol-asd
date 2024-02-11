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
import { getVectorContext } from "ol/render.js";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style.js";
import { Polygon } from "ol/geom";

export default function Comp() {
  useGeographic();
  const { view, map, createMap, setView } = useContext(MapContext);
  const popupDiv = document.querySelector(".ol-selectable");
  const [num, setNum] = useState(0);
  const overlays = [];
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
    const TEMP = document.querySelector(".ol-viewport");
    if (TEMP) {
      TEMP.remove();
    }
    overlays.push(overlay1);
    createMap(TheMap(layers, overlays, view));
  }, [num]);
  function addPoint() {
    map.addLayer(
      new VectorLayer({
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
      })
    );
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
          document.querySelector(".ol-selectable").style.display = "flex";
          popupDiv.style.removeProperty("position");
          let pTag = document.createElement("p");
          cleanTextContent(".ol-selectable");
          if (map.getFeaturesAtPixel(event.pixel)[0] != undefined) {
            pTag.textContent = "ponto";
            popupDiv.appendChild(pTag);
            item.setPosition(event.coordinate);
          } else {
            document.querySelector(".ol-selectable").style.display = "none";
          }
        });
      }
    });
  }
  // (async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/routes");
  //     const result = await response.json();
  //     const polyline = result[0].geometry;
  //     const routes = new Polyline({
  //       factor: 1e6,
  //     }).readGeometry(polyline, {
  //       dataProjection: "EPSG: ",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // })();
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
