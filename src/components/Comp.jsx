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
  const { userView } = useContext(MapContext);
  const [map, setMap] = useState(null);
  const [num, setNum] = useState(0);
  const overlayArray = [];
  const osm = new TileLayer({
    source: new OSM(),
  });
  const layerArray = [osm];

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: "EPSG:4326",
    className: "custom-mouse-position",
  });

  function addPoint(lon, lat) {
    layerArray.push(
      new VectorLayer({
        map: TheMap,
        source: new VectorSource({
          features: [new Feature(new Point([lon, lat]))],
        }),
      })
    );
    setNum(num + 1);
  }

  useEffect(() => {
    const container = document.getElementById("popup");
    const overlay1 = new Overlay({
      id: "overlay1",
      element: container,
    });
    overlayArray.push(overlay1);
    setMap(
      TheMap(
        layerArray,
        userView,
        defaultControls().extend([mousePositionControl]),
        overlayArray
      )
    );
  }, []);
  if (map == null) console.log("map is null");
  return (
    <div id="map">
      <div className="popup"></div>
    </div>
  );
}
