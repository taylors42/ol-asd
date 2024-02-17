import LineString from "ol/geom/LineString.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style.js";
import Point from "ol/geom/Point.js";
import { Feature } from "ol";
import { Overlay } from "ol";
import { Map } from "ol";
import { Coordinate } from "ol/coordinate";

export function addIcon(map, arr) {
  if (map) {
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
    iconFeature.setId("icone");

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [iconFeature],
      }),
    });
    map.addLayer(vectorLayer);
  }
}

export function addLine(map, arr) {
  const style = new Style({
    stroke: new Stroke({
      color: "#41ff33",
      width: 3,
    }),
  });

  const lineFeature = new Feature({
    geometry: new LineString(arr),
  });

  const lineVectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [lineFeature],
    }),
  });

  lineFeature.setId("line");
  lineFeature.setStyle(style);
  map.addLayer(lineVectorLayer);
}

export function addPoint(map, coordinates) {
  map.addLayer(
    new VectorLayer({
      source: new VectorSource({
        features: [new Feature(new Point(coordinates))],
      }),
    })
  );
}

export function createOverlay(map, id, className) {
  const overlay = new Overlay({
    id: id,
    className: className,
    position: [0, 0],
  });
  map.addOverlay(overlay);
}
