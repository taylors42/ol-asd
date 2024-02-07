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
  const { view, map, setMap } = useContext(MapContext);
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
    overlays.push(overlay1);

    setMap(
      TheMap(
        layers,
        defaultControls().extend([mousePositionControl]),
        overlays,
        view
      )
    );
  }, []);
  if (map !== null) {
    const overlaysMap = map.getOverlays().getArray();
    overlaysMap.forEach((item) => {
      if (item.id == "overlay1") {
        map.on("singleclick", () => {
          const coord = document.querySelector(
            ".custom-mouse-position"
          ).textContent;
          const coordArr = coord.split(", ");
          item.setPosition(coordArr);
          console.log("map.on activated");
        });
      }
    });
  }
  return (
    <div id="map">
      <div className="popup">
        <h1>POPUP</h1>
      </div>
    </div>
  );
}
