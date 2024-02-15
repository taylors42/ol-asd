import { useContext, useMemo, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import TheMap from "../context/Map";
import "../App.css";
import { Feature } from "ol";
import { Vector as VectorSource } from "ol/source";
import { OSM } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Point from "ol/geom/Point.js";
import { toLonLat, useGeographic } from "ol/proj.js";
import { Overlay } from "ol";
import { getVectorContext } from "ol/render.js";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style.js";
import { Polygon } from "ol/geom";
import Polyline from "ol/format/Polyline.js";
import LineString from "ol/geom/LineString.js";
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
  const line = [[0, 0]];

  useEffect(() => {
    const container = document.getElementById("popup");
    const overlay1 = new Overlay({
      id: "overlay1",
      element: container,
    });

    if (document.querySelector(".ol-viewport")) {
      document.querySelector(".ol-viewport").remove();
    }
    overlays.push(overlay1);
    createMap(TheMap(layers, overlays, view));
  }, [num]);

  function addPoint(coordinates) {
    map.addLayer(
      new VectorLayer({
        source: new VectorSource({
          features: [new Feature(new Point(coordinates))],
        }),
      })
    );
  }

  function addLine(arr) {
    let style = new Style({
      stroke: new Stroke({
        color: "#41ff33",
        width: 3,
      }),
    });
    const lineFeature = new Feature({
      geometry: new LineString(arr),
    })
    const lineVectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [lineFeature],
      })
    })
    lineFeature.setId("lineStringID");
    lineFeature.setStyle(style)
    map.addLayer(lineVectorLayer);
    addIcon() 

  }

  function cleanPoints() {
    map.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer) {
        let features = layer.getSource().getFeatures();
        features.forEach((feature) => {
          if (feature.getGeometry() instanceof Point) {
            layer.getSource().removeFeature(feature);
          }
        });
      }
    });
  }
  const cleanDuplicateDiv = (div) => {
    const innerDiv = document.querySelectorAll(div);
    if (innerDiv && innerDiv.length > 1) {
      innerDiv[0].remove();
    }
  };
  const cleanDuplicateTextContent = (div) => {
    const innerDiv = document.querySelector(div);
    if (innerDiv && innerDiv.hasChildNodes) {
      while (innerDiv.firstChild) {
        innerDiv.removeChild(innerDiv.firstChild);
      }
      cleanDuplicateDiv(div);
    }
  };

  function cleanDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          array.splice(j, 1);
          j--;
        }
      }
    }
  }
  let localizacoes = [];
  function obterLocalizacaoPontos() {
    map.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer) {
        let features = layer.getSource().getFeatures();
        features.forEach((feature) => {
          if (feature.getGeometry() instanceof Point) {
            let coordenadas = feature.getGeometry().getCoordinates();
            localizacoes.push(coordenadas);
          }
        });
      }
    });

    return localizacoes;
  }
  function randomNum() {
    return Math.floor(Math.random() * 101);
  }
  function test() {
    if (map) {
      cleanPoints();
      addPoint([randomNum, randomNum]);
      addPoint([randomNum, randomNum]);
      const arr = obterLocalizacaoPontos();
      map.addLayer(
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new LineString(arr),
              }),
            ],
          }),
        })
      );
    }
  }
  function walk() {}

  function randomRouteGenerator(arr, num) {
    let lat = Math.random() * 180 - 90;
    let long = Math.random() * 360 - 180;
    arr.push([lat, long]);
  
    for (let i = 1; i < num; i++) {
      lat += (Math.random() - 0.5) * 20; // Variação aleatória na latitude
      long += (Math.random() - 0.5) * 20; // Variação aleatória na longitude
      arr.push([lat, long]);
    }
  }
  
  function addIcon() {
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
        geometry: new Point(line[line.length - 1]),
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
  if (map !== null) {
    cleanPoints()
    randomRouteGenerator(line, 2)
    cleanDuplicates(line)
    addLine(line)
    addIcon() 
    const overlaysMap = map.getOverlays().getArray();
    map.on("singleclick", (event) => {
      document.querySelector(".ol-selectable").style.display = "flex"
      popupDiv.style.removeProperty("position")
      let pTag = document.createElement("p")
      const featuresObj = map.getFeaturesAtPixel(event.pixel)[0]
      if (featuresObj !== undefined){
        if (featuresObj.id_ === "lineStringID"){
          overlaysMap.forEach((item) => {
            if (item.id === "overlay1"){
              cleanDuplicateDiv("ol-selectable")
              cleanDuplicateTextContent(".ol-selectable")
              popupDiv.appendChild(pTag)
              pTag.textContent = "linha"
              item.setPosition(event.coordinate)
            }
          })
        }
        else if (featuresObj.id_ === "icone"){
          overlaysMap.forEach((item) => {
            if (item.id === "overlay1"){
              cleanDuplicateDiv("ol-selectable")
              cleanDuplicateTextContent(".ol-selectable")
              popupDiv.appendChild(pTag)
              pTag.textContent = "icone"
              item.setPosition(event.coordinate)
            }
          })
        }
      }
      else {
        document.querySelector(".ol-selectable").style.display = "none"
      }
    })
    
  }

  return (
    <div id="map">
      <button
        className="botao"
        style={{ position: "absolute", zIndex: "10", marginLeft: "2rem" }}
        onClick={() => {
          addPoint([
            Math.floor(Math.random() * 101),
            Math.floor(Math.random() * 101),
          ]);
        }}
      >
        Click
      </button>
    </div>
  );
}
