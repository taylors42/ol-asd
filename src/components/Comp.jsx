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
export default function Comp() {
  const { map, setMap } = useContext(MapContext);
  const [num, setNum] = useState(0);
  useGeographic();

  const osm = new TileLayer({
    source: new OSM(),
  });

  // const point = new VectorLayer({
  //   map: map,
  //   source: new VectorSource({
  //     features: [new Feature(new Point([0, 0]))],
  //   }),
  // });

  const layerArray = [osm];

  function makeLayer(lon, lat) {
    layerArray.push(
      new VectorLayer({
        map: map,
        source: new VectorSource({
          features: [new Feature(new Point([lon, lat]))],
        }),
      })
    );
  }

  useEffect(() => {
    setMap(TheMap(layerArray));
  }, [num]);

  return (
    <div id="map">
      <button
        onClick={() => {
          makeLayer(0, 0);
          setNum(num + 1);
          console.log(layerArray);
        }}
      >
        click
      </button>
    </div>
  );
}
