import LineString from "ol/geom/LineString.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style.js";
import Point from "ol/geom/Point.js";
import { Feature } from "ol";
import { Overlay } from "ol";
import { cleanDuplicateDiv, cleanDuplicateTextContent } from "./cleanScripts";
import Select from "ol/interaction/Select.js";
export function createIcon(map, arr) {
  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "https://openlayers.org/en/latest/examples/data/icon.png",
    }),
  });

  const iconFeature = new Feature({
    geometry: new Point(arr[arr.length - 1]),
  });

  iconFeature.setStyle(iconStyle);
  iconFeature.setId("icon");

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [iconFeature],
    }),
  });
  map?.addLayer(vectorLayer);
  return iconFeature?.getId();
}
/**
 *
 * @param {*} map: obj
 * @param {*} coordinates: a array [lon, lat]
 * @returns icon id: str
 * the icon on the final of LineString
 */
export function createLine(map, coordinates) {
  const style = new Style({
    stroke: new Stroke({
      color: "#41ff33",
      width: 3,
    }),
  });
  let correct_coordinates = coordinates?.map((s) => s.reverse());
  correct_coordinates.shift();
  const lineFeature = new Feature({
    geometry: new LineString(correct_coordinates),
  });

  const lineVectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [lineFeature],
    }),
  });
  lineFeature.setId("line");
  lineFeature.setStyle(style);
  map?.addLayer(lineVectorLayer);
  const iconId = createIcon(map, correct_coordinates);
  return iconId;
}
/**
 *
 * @param {a instance of Map class} map
 * @param {string} id
 * @param {array} coordinates: a array [lon, lat]
 * @returns {object}
 * @param {instance of Overlay class} overlay
 * @param
 *
 */
export function createPoint(map, id, coordinates, text) {
  if (!map instanceof Map)
    return console.error("the map isn't a instance of the class Map");
  let point = new Feature({
    geometry: new Point(coordinates?.reverse()),
  });
  point?.setId(id);
  map?.addLayer(
    new VectorLayer({
      source: new VectorSource({
        features: [point],
      }),
    })
  );
  const overlay = new Overlay({
    id: id,
    className: id,
    position: undefined,
  });
  map?.addOverlay(overlay);
  const obj = {
    overlay: overlay,
    id: point?.getId(),
    text: text,
  };
  return obj;
}
/**
 *
 * @param {*} map: obj
 * @param {*} id: str
 * @returns Overlay id: str
 *
 */
// export function createOverlay(map, id) {
//   map?.addOverlay(
//     new Overlay({
//       id: id,
//       className: id,
//       position: undefined,
//     })
//   );
//   const obj = {
//     id:map
//     ?.getOverlays()
//     .getArray()
//     .find((obj) => obj.id === id),
//     overlay:
//   }
//   return
// }
